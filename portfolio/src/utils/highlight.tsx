import { Fragment } from 'react';

const KEYWORDS = new Set([
  'export', 'default', 'function', 'return', 'const', 'let', 'var', 'public',
  'private', 'class', 'new', 'if', 'else', 'import', 'from', 'interface',
  'type', 'void', 'static', 'async', 'await', 'Request', 'response', 'motion',
  'as', 'useState', 'useEffect', 'true', 'false', 'null',
]);

export function highlightLine(line: string, key: number) {
  const tokens = line.split(/(\s+|[(){}\[\];,.=><:])/g).filter((t) => t !== '');

  return (
    <div key={key} className="whitespace-pre">
      {tokens.length === 0 ? '\u00A0' : null}
      {tokens.map((tok, i) => {
        if (/^['"`].*['"`]$/.test(tok)) {
          return (
            <span key={i} className="text-emerald-400">
              {tok}
            </span>
          );
        }
        if (/^\d+(\.\d+)?$/.test(tok)) {
          return (
            <span key={i} className="text-cyan-300">
              {tok}
            </span>
          );
        }
        if (KEYWORDS.has(tok)) {
          return (
            <span key={i} className="text-purple-400">
              {tok}
            </span>
          );
        }
        if (tok.startsWith('//') || tok.startsWith('#')) {
          return (
            <span key={i} className="text-white/30 italic">
              {tok}
            </span>
          );
        }
        return (
          <Fragment key={i}>
            <span className="text-white/65">{tok}</span>
          </Fragment>
        );
      })}
    </div>
  );
}
