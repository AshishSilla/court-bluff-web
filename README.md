# Court Bluff (Frontend)

A React app for a hidden-influence bluffing game (Coup-like).  
Built with **React, Vite, Tailwind, and Zustand**.  
This is the player-facing interface: lobby, table view, and action prompts.  
It connects to a Socket.IO backend for real-time multiplayer gameplay.

---

## 🎯 Motivation
This project was built as a weekend learning + portfolio project  
to explore how **GenAI tools** (Lovable, ChatGPT, etc.) can accelerate full-stack product development.  
The focus of this MVP is to **validate core game mechanics** (turn order, actions, challenges, blocks) rather than polished UI.

---

## ✨ Features
- Create/join room by code
- Lobby with live player list
- Responsive game table (mobile-first)
- Action buttons: Income, Foreign Aid, Tax, Coup
- Modal prompts: Challenge, Block, Allow
- Zustand store for client state management

---

## 🛠️ Tech Stack
- React + Vite + TypeScript
- TailwindCSS
- Zustand
- Socket.IO client

---

## 🚀 Getting Started
```bash
git clone https://github.com/<your-username>/court-bluff-web.git
cd court-bluff-web
npm install
npm run dev
