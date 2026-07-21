import { useEffect, useRef } from 'react';

interface TrailDot {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const trailRef = useRef<TrailDot[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 1, size: 6 });
      if (trailRef.current.length > 28) trailRef.current.shift();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const colors = ['#3B82F6', '#6366F1', '#A855F7', '#22D3EE'];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trailRef.current.forEach((dot, i) => {
        const ratio = i / trailRef.current.length;
        const color = colors[Math.floor(ratio * colors.length)];
        ctx.save();
        ctx.globalAlpha = ratio * 0.6;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * ratio, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      // Main cursor dot
      const { x, y } = mouseRef.current;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = '#3B82F6';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none hidden md:block"
    />
  );
}
