# Humphrey Lionel Gevero — Portfolio

A personal portfolio website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 Animated floating blob background with grain texture
- 🖱️ Mouse parallax on background elements
- 📜 Scroll progress bar
- 🔲 Glassmorphism nav, cards, and UI throughout
- 🎭 Framer Motion scroll-triggered animations on every section
- 📊 Animated stat counters
- ⏱️ Vertical experience timeline
- 🧩 Categorized skill cards
- 💼 Project showcase with live/GitHub links
- 📬 Contact form with validation
- ⚡ Elegant loading screen
- 📱 Fully responsive
- ♿ Respects prefers-reduced-motion

## 🛠 Tech Stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide React

## 🚀 Deploy to GitHub Pages

### Step 1 — Customize

1. **Repo name** — if your repo isn't named `portfolio`, update `vite.config.ts`:
   ```ts
   base: '/YOUR-REPO-NAME/',
   ```

2. **Your email** — update `src/sections/Contact.tsx` and `src/components/Footer.tsx`

3. **Your links** — update GitHub, LinkedIn URLs in `src/utils/data.ts` and `src/components/Footer.tsx`

4. **Project URLs** — update `liveUrl` in `src/utils/data.ts` when you have live links

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "🚀 Initial portfolio launch"
git branch -M main
git remote add origin https://github.com/hamp25/portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Repo → **Settings** → **Pages**
2. Source → **GitHub Actions**
3. Live in ~2 min at: `https://hamp25.github.io/portfolio/`

## 💻 Local Dev

```bash
npm install
npm run dev
```

## 📁 Structure

```
src/
├── components/     # Navbar, Footer, Background, AnimatedCounter, LoadingScreen, ScrollProgress
├── sections/       # Hero, About, Experience, Skills, Projects, Contact
├── hooks/          # useMouseParallax, useScrollProgress, useActiveSection
├── utils/          # animations.ts, data.ts
└── types/          # TypeScript interfaces
```
