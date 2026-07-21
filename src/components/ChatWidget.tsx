import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are Humphrey's AI assistant on his personal portfolio website. You represent Humphrey Lionel Gevero — a Data Analyst, Software Developer, Project Manager, and Founder & CEO of CoreTek Digital Solutions based in the Philippines.

Answer questions about Humphrey warmly and professionally. Key facts:
- 3+ years of experience in software development, data analytics, and project management
- Founder & CEO of CoreTek Digital Solutions
- Project Manager at Mabizza IT Solutions
- Previously Customer Support Associate at Dice205 Digital Corporation
- Skills: React, TypeScript, Python, PHP, Next.js, Node.js, Laravel, PostgreSQL, Power BI, Tableau, Tailwind CSS, Framer Motion, Git, Jira, ClickUp, Figma
- Open to remote work, US opportunities, Japan opportunities, and relocation
- Available for freelance, full-time, and startup collaborations
- Email: humphreylionelgevero@gmail.com
- GitHub: github.com/hamp25
- Company website: coretekdigital.netlify.app

Help visitors learn about Humphrey's work, services, and how to get in touch. If asked about booking or contact, encourage them to use the Contact section or email directly. Keep responses concise, friendly, and professional. If asked something you don't know, say you'll have Humphrey follow up personally.`;

const QUICK_REPLIES = [
  "What services does Humphrey offer?",
  "Is he available for hire?",
  "What tech stack does he use?",
  "How can I contact him?",
];

async function sendMessage(messages: { role: string; content: string }[]): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
    const data = await response.json();
    return data.content?.[0]?.text ?? "I'm having trouble connecting right now. Please reach out to Humphrey directly at humphreylionelgevero@gmail.com!";
  } catch {
    return "I'm offline right now. Please contact Humphrey directly at humphreylionelgevero@gmail.com or use the Contact section below!";
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "👋 Hi! I'm Humphrey's AI assistant. I can answer questions about his skills, experience, availability, and services. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
    const reply = await sendMessage(history);

    setMessages((m) => [...m, { id: Date.now().toString() + '1', role: 'assistant', content: reply }]);
    setLoading(false);
    if (!open) setUnread((n) => n + 1);
  };

  return (
    <>
      {/* Chat bubble button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-primary shadow-2xl shadow-primary/40 flex items-center justify-center text-white hover:bg-primary-light transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 300 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Unread badge */}
        {unread > 0 && !open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 text-black text-xs font-bold flex items-center justify-center"
          >
            {unread}
          </motion.div>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed bottom-24 right-6 z-[998] w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/90 to-indigo/90 backdrop-blur-xl px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm">Humphrey's Assistant</div>
                <div className="flex items-center gap-1.5 text-white/60 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online · Powered by Claude AI
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="h-80 overflow-y-auto px-4 py-4 space-y-4 bg-[#0d0d10]"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#3B82F6 transparent' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === 'assistant'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-white/6 text-white/80 rounded-tl-sm border border-white/6'
                        : 'bg-primary text-white rounded-tr-sm shadow-lg shadow-primary/20'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white/6 border border-white/6 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/40"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="px-3 py-2 bg-[#0d0d10] flex flex-wrap gap-1.5 border-t border-white/4">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 rounded-xl text-xs text-primary border border-primary/25 hover:bg-primary/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-[#111113] border-t border-white/6 px-3 py-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-primary/40 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-light transition-colors flex-shrink-0"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
