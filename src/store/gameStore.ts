import { create } from 'zustand';

// Types for game state
export type GameState = 'landing' | 'lobby' | 'active' | 'ended';

export type Player = {
  id: string;
  name: string;
  coins: number;
  influenceCount: number;
  isAlive: boolean;
  isActive?: boolean;
};

export type GameAction = 'income' | 'foreign-aid' | 'coup' | 'tax' | 'assassinate' | 'exchange' | 'steal';

export type ResponseKind = 'allow' | 'block' | 'challenge';

export type GameEvent = {
  id: string;
  timestamp: number;
  message: string;
  playerId?: string;
};

// Store interface
interface GameStore {
  // UI State
  currentPage: 'landing' | 'room';
  displayName: string;
  roomCode: string;
  roomId: string | null;
  
  // Game State
  gameState: GameState;
  players: Player[];
  currentPlayerId: string | null;
  myPlayerId: string | null;
  events: GameEvent[];
  
  // UI interaction state
  showModal: boolean;
  modalType: 'action' | 'response' | 'reveal' | null;
  pendingAction: GameAction | null;
  targetPlayerId: string | null;
  
  // Actions
  setDisplayName: (name: string) => void;
  setRoomCode: (code: string) => void;
  navigateToRoom: (roomId: string) => void;
  navigateToLanding: () => void;
  
  // Game actions (will emit to server later)
  createRoom: (name: string) => string; // returns roomId
  joinRoom: (code: string, name: string) => string; // returns roomId
  startGame: () => void;
  chooseAction: (action: GameAction, { targetId }?: { targetId?: string }) => void;
  respond: (kind: ResponseKind) => void;
  chooseReveal: (index: number) => void;
  
  // UI actions
  showActionModal: (action: GameAction, targetId?: string) => void;
  showResponseModal: () => void;
  hideModal: () => void;
  addEvent: (message: string, playerId?: string) => void;
}

// Create store
export const useGameStore = create<GameStore>((set, get) => ({
  // Initial UI state
  currentPage: 'landing',
  displayName: '',
  roomCode: '',
  roomId: null,
  
  // Initial game state
  gameState: 'landing',
  players: [],
  currentPlayerId: null,
  myPlayerId: null,
  events: [],
  
  // Initial interaction state
  showModal: false,
  modalType: null,
  pendingAction: null,
  targetPlayerId: null,
  
  // UI actions
  setDisplayName: (name) => set({ displayName: name }),
  setRoomCode: (code) => set({ roomCode: code }),
  
  navigateToRoom: (roomId) => set({ 
    currentPage: 'room', 
    roomId,
    gameState: 'lobby' 
  }),
  
  navigateToLanding: () => set({ 
    currentPage: 'landing',
    roomId: null,
    gameState: 'landing',
    players: [],
    events: []
  }),
  
  // Placeholder game actions (will emit to server later)
  createRoom: (name) => {
    const roomId = Math.random().toString(36).substr(2, 6).toUpperCase();
    const myId = 'player-' + Math.random().toString(36).substr(2, 8);
    
    set({
      currentPage: 'room',
      roomId,
      gameState: 'lobby',
      myPlayerId: myId,
      players: [{
        id: myId,
        name,
        coins: 2,
        influenceCount: 2,
        isAlive: true
      }]
    });
    
    get().addEvent(`${name} created the room`);
    return roomId;
  },
  
  joinRoom: (code, name) => {
    const myId = 'player-' + Math.random().toString(36).substr(2, 8);
    
    set({
      currentPage: 'room',
      roomId: code,
      gameState: 'lobby',
      myPlayerId: myId,
      players: [
        {
          id: 'host-player',
          name: 'Host Player',
          coins: 2,
          influenceCount: 2,
          isAlive: true
        },
        {
          id: myId,
          name,
          coins: 2,
          influenceCount: 2,
          isAlive: true
        }
      ]
    });
    
    get().addEvent(`${name} joined the room`);
    return code;
  },
  
  startGame: () => {
    // Add some fake players for demo
    const { players, myPlayerId } = get();
    const fakeId1 = 'fake-player-1';
    const fakeId2 = 'fake-player-2';
    
    const allPlayers = [
      ...players,
      {
        id: fakeId1,
        name: 'Alice',
        coins: 2,
        influenceCount: 2,
        isAlive: true
      },
      {
        id: fakeId2,
        name: 'Bob',
        coins: 2,
        influenceCount: 2,
        isAlive: true
      }
    ];
    
    set({
      gameState: 'active',
      players: allPlayers,
      currentPlayerId: myPlayerId // Start with current player's turn
    });
    
    get().addEvent('Game started!');
  },
  
  chooseAction: (action, { targetId } = {}) => {
    const { myPlayerId, currentPlayerId } = get();
    if (currentPlayerId !== myPlayerId) return;
    
    get().addEvent(`You chose ${action}${targetId ? ` targeting player` : ''}`);
    // TODO: emit to server
  },
  
  respond: (kind) => {
    get().addEvent(`You chose to ${kind}`);
    get().hideModal();
    // TODO: emit to server
  },
  
  chooseReveal: (index) => {
    get().addEvent(`You revealed influence ${index + 1}`);
    get().hideModal();
    // TODO: emit to server
  },
  
  // UI modal actions
  showActionModal: (action, targetId) => set({
    showModal: true,
    modalType: 'action',
    pendingAction: action,
    targetPlayerId: targetId
  }),
  
  showResponseModal: () => set({
    showModal: true,
    modalType: 'response'
  }),
  
  hideModal: () => set({
    showModal: false,
    modalType: null,
    pendingAction: null,
    targetPlayerId: null
  }),
  
  addEvent: (message, playerId) => {
    const event: GameEvent = {
      id: Math.random().toString(36),
      timestamp: Date.now(),
      message,
      playerId
    };
    
    set(state => ({
      events: [event, ...state.events].slice(0, 20) // Keep last 20 events
    }));
  }
}));