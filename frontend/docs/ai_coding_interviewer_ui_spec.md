
# AI Coding Interviewer — UI Specification

*Generated on 2025-05-16 16:38 (Asia/Seoul)*  

---

## 0. Global Foundations

| Token | Choice | Rationale |
|-------|--------|-----------|
| **Design System** | Tailwind CSS + shadcn/ui | Rapid dev & consistent theming |
| **Grid / Breakpoints** | 12‑col, `max-w-screen-2xl`, `lg` ≥ 1024 px | Fits code editor + chat split |
| **Fonts** | “Inter” (UI) & “Fira Code” (editor) | Readability |
| **Brand Palette** | Slate/gray surfaces + single vivid accent | Calm dev aesthetic |
| **Icon Set** | lucide-react | Feather‑style, code-friendly |
| **Motion** | Framer‑motion, ≤ 200 ms | Subtle state cues |

---

## 1. Site Map

### 1.1 Public‑Facing (Marketing & Docs)

| Route | Title | Key Sections |
|-------|-------|--------------|
| `/` | Landing | Hero • Features • CTA |
| `/how-it-works` | How It Works | 3‑step workflow, screenshots |
| `/pricing` | Pricing | Plan cards • FAQ |
| `/demo` | Live Demo | Read‑only interview room |
| `/docs` | Docs | Markdown‑style help/API |
| `/legal/terms` | Terms | — |
| `/legal/privacy` | Privacy | — |

### 1.2 Auth & Account

| Route | Purpose |
|-------|---------|
| `/auth/signup` | Multi‑step sign‑up |
| `/auth/login` | Log in |
| `/auth/forgot` | Request reset link |
| `/auth/reset/:token` | Set new password |

### 1.3 Candidate App

| Route | Screen | Notes |
|-------|--------|-------|
| `/app/dashboard` | Dashboard | Next interview • Stats |
| `/app/history` | History | Table of sessions |
| `/app/settings` | Settings | Profile • Prefs |
| `/app/interview/:id/precheck` | Pre‑Check Wizard | Env test • Instructions |
| `/app/interview/:id` | **Live Interview** | Split Chat ↔ Code panes |
| `/app/interview/:id/review` | Review | Score & feedback |

### 1.4 Admin / Hiring‑Team

| Route | Screen |
|-------|--------|
| `/admin/dashboard` | Org metrics |
| `/admin/questions` | Question bank CRUD |
| `/admin/analytics` | Heatmaps & charts |
| `/admin/mcp-monitor` | Session context viewer |
| `/admin/team` | Manage users & roles |

### 1.5 Utility

| Route | Purpose |
|-------|---------|
| `/404` | Not found |

> **Total pages:** 23 (7 public, 4 auth, 6 candidate, 5 admin, 1 utility)

---

## 2. Key Page Layouts

### 2.1 Landing Page

```
┌──────────── Hero (100 vh) ────────────┐
│  Headline + sub  |  Product video    │
└───────────────────────────────────────┘
 Features Grid • Testimonials • Pricing CTA
```

*CTA Buttons:* “Start Free Practice”, “See How It Works”  
*Palette:* Light slate background, accent‑blue buttons.

---

### 2.2 Live Interview (`/app/interview/:id`)

```
┌ Header ─ Question 2/5 • Timer • End btn ┐
┌──── Chat Panel ─────┬─── Code Editor ──┐
│ AI & candidate msgs │ Monaco editor    │
│ Request hint chip   │ Run / Submit btn │
└─────────────────────┴──────────────────┘
Footer: Shortcuts • Docs • Report Issue
```

*Resizable divider* (`react-resizable-panels`).  
Keyboard: `Esc` → chat, `Ctrl/Cmd+L` → editor.

---

### 2.3 Post‑Interview Review

1. **Score Banner** – % passed, time, stack  
2. **Accordion Breakdown** – each question, unit‑tests, rubric  
3. **Strengths & Improvements** – GPT‑generated  
4. **Export** – Download PDF / Share link

---

## 3. Component Inventory

- **Timer Chip** – `variant="destructive"` when < 2 min  
- **Language Switcher** – inline select, no reload  
- **Markdown Renderer** – chat messages & docs tab  
- **Toast System** – optimistic UI for saves  
- **Drag‑Resize Handle** – 4 px wide, `cursor-ew-resize`

---

## 4. Responsive Rules

| Width | Layout |
|-------|--------|
| ≥ 1024 px | Two‑pane chat + editor |
| 768‑1023 | Tabs: Chat / Code |
| ≤ 767 | Portrait: Code first, swipe for Chat |

Dark mode uses identical palette tokens reversed.



_Use this markdown file as the single source‑of‑truth to align designers and devs._  
