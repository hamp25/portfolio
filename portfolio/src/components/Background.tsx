import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  blur: number;
}

const BLOB_CONFIGS = [
  { size: 420, color: '#3B82F6', opacity: 0.55, blur: 80 },
  { size: 360, color: '#A855F7', opacity: 0.50, blur: 70 },
  { size: 300, color: '#22D3EE', opacity: 0.45, blur: 65 },
  { size: 480, color: '#6366F1', opacity: 0.40, blur: 90 },
  { size: 260, color: '#3B82F6', opacity: 0.55, blur: 60 },
  { size: 340, color: '#A855F7', opacity: 0.45, blur: 75 },
  { size: 290, color: '#22D3EE', opacity: 0.50, blur: 65 },
  { size: 390, color: '#6366F1', opacity: 0.40, blur: 80 },
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize blobs with random positions and velocities
    blobsRef.current = BLOB_CONFIGS.map((cfg) => ({
      ...cfg,
      x: randomBetween(cfg.size / 2, window.innerWidth - cfg.size / 2),
      y: randomBetween(cfg.size / 2, window.innerHeight - cfg.size / 2),
      vx: randomBetween(-1.2, 1.2) * (0.6 + Math.random() * 0.8),
      vy: randomBetween(-1.2, 1.2) * (0.6 + Math.random() * 0.8),
    }));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (const blob of blobsRef.current) {
        // Move
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce off walls — reflect velocity when edge is hit
        const r = blob.size / 2;
        if (blob.x - r <= 0) { blob.x = r; blob.vx = Math.abs(blob.vx); }
        if (blob.x + r >= w) { blob.x = w - r; blob.vx = -Math.abs(blob.vx); }
        if (blob.y - r <= 0) { blob.y = r; blob.vy = Math.abs(blob.vy); }
        if (blob.y + r >= h) { blob.y = h - r; blob.vy = -Math.abs(blob.vy); }

        // Draw
        ctx.save();
        ctx.filter = `blur(${blob.blur}px)`;
        ctx.globalAlpha = blob.opacity;
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, blob.color + '00');
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Canvas blobs */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      {/* Grain texture */}
      <div className="grain-overlay" />

      {/* Edge vignette to keep edges dark */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(9,9,11,0.85) 100%)',
        }}
      />

      {/* Subtle hero top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
