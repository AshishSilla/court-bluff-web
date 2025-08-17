# Court Bluff (Frontend)

React app for a hidden-influence bluffing game (Coup-like).  
Built with **React, Vite, Tailwind, and Zustand**.  

This project is part of a weekend learning + portfolio experiment to explore how GenAI tools can accelerate full-stack product development.  
It validates the **game mechanics** of Coup in a browser-based format, starting with a simple UI scaffold and expanding later.

---

## Features
- Landing page with create/join room flow
- Lobby with room code + player list
- Game table UI showing players, coins, influence slots
- Action buttons (Income, Coup, Tax, Foreign Aid)
- Modal prompts for Challenge, Block, and Allow
- Zustand store for client state
- Connects to a Socket.IO backend for real-time play

---

## Tech Stack
- React + Vite + TypeScript
- Tailwind CSS
- Zustand (state management)
- Socket.IO client

---

## Getting Started

Clone and run locally:

```bash
git clone https://github.com/<your-username>/court-bluff-web.git
cd court-bluff-web
npm install
npm run dev
