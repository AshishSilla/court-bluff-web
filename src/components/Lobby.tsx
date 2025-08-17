import { useGameStore } from '@/store/gameStore';
import { Button } from './Button';
import { PlayerPill } from './PlayerPill';
import { EventLog } from './EventLog';
import { Crown, Copy, Play, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Lobby() {
  const { 
    roomId, 
    players, 
    myPlayerId, 
    startGame, 
    navigateToLanding 
  } = useGameStore();
  
  const { toast } = useToast();
  
  const copyRoomCode = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast({
        title: "Room code copied!",
        description: "Share this code with your friends to invite them.",
      });
    }
  };
  
  const isHost = players.length > 0 && players[0].id === myPlayerId;
  const canStart = players.length >= 2; // Minimum players for demo
  
  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={navigateToLanding}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Leave Room
        </Button>
        
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-accent" />
          <span className="font-bold text-lg">Court Bluff</span>
        </div>
      </div>
      
      {/* Room Info */}
      <div className="bg-card border border-game-border rounded-2xl p-4 shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-card-foreground">
            Game Lobby
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={copyRoomCode}
            className="flex items-center gap-2"
          >
            <Copy size={14} />
            {roomId}
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Players:</span>
            <span className="font-medium text-card-foreground">
              {players.length}/6
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-medium text-accent">
              Waiting for players...
            </span>
          </div>
        </div>
      </div>
      
      {/* Players List */}
      <div className="bg-card border border-game-border rounded-2xl p-4 shadow-medium">
        <h3 className="font-semibold text-card-foreground mb-4">Players</h3>
        <div className="space-y-2">
          {players.map((player, index) => (
            <PlayerPill
              key={player.id}
              name={`${player.name}${index === 0 ? ' (Host)' : ''}${player.id === myPlayerId ? ' (You)' : ''}`}
              coins={player.coins}
              alive={player.isAlive}
            />
          ))}
          
          {/* Empty slots */}
          {Array.from({ length: 6 - players.length }, (_, i) => (
            <div 
              key={`empty-${i}`}
              className="p-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 text-center text-sm text-muted-foreground"
            >
              Waiting for player...
            </div>
          ))}
        </div>
      </div>
      
      {/* Event Log */}
      <EventLog />
      
      {/* Start Game Button */}
      {isHost && (
        <div className="sticky bottom-4">
          <Button
            variant="accent"
            onClick={startGame}
            disabled={!canStart}
            fullWidth
            size="lg"
            className="flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Start Game
            {!canStart && ` (Need ${2 - players.length} more players)`}
          </Button>
        </div>
      )}
    </div>
  );
}