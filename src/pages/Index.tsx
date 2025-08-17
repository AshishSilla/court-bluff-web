import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/Button';
import { Crown, Users, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { 
    displayName, 
    roomCode, 
    setDisplayName, 
    setRoomCode, 
    createRoom, 
    joinRoom 
  } = useGameStore();
  
  const navigate = useNavigate();
  
  const [joinMode, setJoinMode] = useState(false);
  
  const handleCreateRoom = () => {
    if (!displayName.trim()) return;
    const id = createRoom(displayName);
    navigate(`/r/${id}`);
  };
  
  const handleJoinRoom = () => {
    if (!displayName.trim() || !roomCode.trim()) return;
    joinRoom(roomCode, displayName);
    navigate(`/r/${roomCode}`);
  };
  
  return (
    <div className="min-h-screen bg-game-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* App Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold text-foreground">Court Bluff</h1>
          </div>
          <p className="text-muted-foreground">
            The ultimate game of deception and strategy
          </p>
          <p className="text-sm text-muted-foreground/80">
            3-6 players • 15-30 minutes
          </p>
        </div>
        
        {/* Main Form */}
        <div className="bg-card border border-game-border rounded-2xl p-6 shadow-medium space-y-6">
          {/* Display Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-card-foreground">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-2xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              maxLength={20}
            />
          </div>
          
          {/* Room Code Input (conditional) */}
          {joinMode && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-card-foreground">
                Room Code
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Enter room code"
                className="w-full px-4 py-2 rounded-2xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring uppercase"
                maxLength={6}
              />
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="space-y-3">
            {!joinMode ? (
              <>
                <Button
                  variant="primary"
                  onClick={handleCreateRoom}
                  disabled={!displayName.trim()}
                  fullWidth
                  className="flex items-center justify-center gap-2"
                >
                  <Users size={20} />
                  Create New Game
                </Button>
                <p className="text-xs text-center text-muted-foreground px-2">
                  Start a new game and invite friends with a room code
                </p>
                
                <Button
                  variant="secondary"
                  onClick={() => setJoinMode(true)}
                  fullWidth
                  className="flex items-center justify-center gap-2"
                >
                  <LogIn size={20} />
                  I Have a Room Code
                </Button>
                <p className="text-xs text-center text-muted-foreground px-2">
                  Join an existing game with a friend's room code
                </p>
              </>
            ) : (
              <>
                <Button
                  variant="accent"
                  onClick={handleJoinRoom}
                  disabled={!displayName.trim() || !roomCode.trim()}
                  fullWidth
                  className="flex items-center justify-center gap-2"
                >
                  <LogIn size={20} />
                  Join Game
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => {
                    setJoinMode(false);
                    setRoomCode('');
                  }}
                  fullWidth
                >
                  Back - Create New Game Instead
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          A game of influence, deduction, and bluffing
        </div>
      </div>
    </div>
  );
};

export default Index;
