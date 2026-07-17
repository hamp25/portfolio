import { highlightLine } from '../utils/highlight';

interface Props {
  filename: string;
  lines: string[];
  accentColor: string;
}

export default function CodeThumbnail({ filename, lines, accentColor }: Props) {
  return (
    <div className="relative h-44 bg-[#161616] overflow-hidden flex flex-col">
      {/* Title bar */}
      <div className="relative flex items-center gap-1.5 px-3.5 py-2 bg-[#232323] border-b border-white/5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-white/35 font-mono select-none">
          {filename}
        </span>
      </div>

      {/* Code body */}
      <div className="relative flex-1 px-4 py-3 font-mono text-[11px] leading-[1.7] overflow-hidden">
        {lines.map((line, i) => highlightLine(line, i))}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#161616] to-transparent" />
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
    </div>
  );
}
