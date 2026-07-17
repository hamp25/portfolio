import { useTypewriter } from '../hooks/useTypewriter';

const sqlQueries = [
  "SELECT * FROM users WHERE active = true;",
  "SELECT department, AVG(salary) FROM employees GROUP BY department;",
  "INSERT INTO orders (customer_id, total) VALUES (102, 249.99);",
  "UPDATE inventory SET stock = stock - 1 WHERE product_id = 88;",
  "SELECT COUNT(*) FROM sessions WHERE created_at >= NOW() - INTERVAL '1 day';",
  "SELECT name, revenue FROM projects ORDER BY revenue DESC LIMIT 5;",
  "DELETE FROM logs WHERE created_at < '2024-01-01';",
  "SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id;",
  "CREATE INDEX idx_customer_email ON customers(email);",
  "SELECT DATE_TRUNC('month', order_date), SUM(total) FROM sales GROUP BY 1;",
];

export default function TypingSQL() {
  const text = useTypewriter({ words: sqlQueries, pauseDuration: 1500 });

  return (
    <div className="w-full max-w-md sm:max-w-lg rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 bg-[#1e1e1e]">
      {/* macOS title bar */}
      <div className="relative flex items-center gap-2 px-4 py-2.5 bg-[#2b2b2b] border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="absolute left-1/2 -translate-x-1/2 text-[11px] sm:text-xs text-white/40 font-mono select-none">
          queries.sql — zsh
        </span>
      </div>

      {/* Terminal body */}
      <div className="px-4 py-3 sm:py-4 font-mono text-[11px] sm:text-xs md:text-sm text-left">
        <div className="whitespace-nowrap">
          <span className="text-emerald-400 select-none">➜ </span>
          <span className="text-cyan select-none">~/database</span>
          <span className="text-white/40 select-none"> git:(</span>
          <span className="text-purple select-none">main</span>
          <span className="text-white/40 select-none">) </span>
          <span className="text-white/40 select-none">psql</span>
        </div>
        <div className="mt-1 break-words">
          <span className="text-emerald-400 select-none">sql&gt; </span>
          <span className="text-white/80">
            {text}
            <span className="inline-block w-[2px] h-3.5 sm:h-4 align-middle bg-white/80 ml-0.5 animate-pulse" />
          </span>
        </div>
      </div>
    </div>
  );
}
