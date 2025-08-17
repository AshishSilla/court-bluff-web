import { useGameStore } from '@/store/gameStore';
import { PlayerPill } from './PlayerPill';
import { InfluenceSlots } from './InfluenceSlots';
import { ActionBar } from './ActionBar';
import { EventLog } from './EventLog';
import { TimerRing } from './TimerRing';
import { CardBack } from './CardBack';
import { Button } from './Button';
import { Crown, ArrowLeft } from 'lucide-react';

export function Table() {
  const { 
    players, 
    myPlayerId, 
    currentPlayerId,
    navigateToLanding 
  } = useGameStore();
  
  const me = players.find(p => p.id === myPlayerId);
  const otherPlayers = players.filter(p => p.id !== myPlayerId);
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  
  return (
    <div className="min-h-screen p-4 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={navigateToLanding}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Leave Game
        </Button>
        
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-accent" />
          <span className="font-bold text-lg">Court Bluff</span>
        </div>
        
        {currentPlayer && (
          <div className="flex items-center gap-2">
            <TimerRing progress={75} size="sm" />
            <span className="text-sm font-medium">
              {currentPlayer.name}'s turn
            </span>
          </div>
        )}
      </div>
      
      {/* Other Players Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {otherPlayers.map((player) => (
          <div 
            key={player.id}
            className="space-y-2"
          >
            <PlayerPill
              name={player.name}
              coins={player.coins}
              alive={player.isAlive}
              isActive={player.id === currentPlayerId}
            />
            
            {/* Player's influence slots */}
            <div className="flex items-center justify-center gap-2">
              <InfluenceSlots count={player.influenceCount} />
              <div className="flex gap-1">
                {Array.from({ length: player.influenceCount }, (_, i) => (
                  <CardBack key={i} size="sm" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* My Player Area */}
      {me && (
        <div className="bg-card border border-game-border rounded-2xl p-4 shadow-medium">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <PlayerPill
                name={`${me.name} (You)`}
                coins={me.coins}
                alive={me.isAlive}
                isCurrent={me.id === currentPlayerId}
                className="flex-1"
              />
              <InfluenceSlots count={me.influenceCount} mine />
            </div>
            
            {/* My influence cards */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: me.influenceCount }, (_, i) => (
                <div 
                  key={i}
                  className="relative group cursor-pointer"
                >
                  <CardBack size="md" />
                  <div className="absolute inset-0 bg-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Card {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Event Log */}
      <EventLog />
      
      {/* Action Bar - Sticky at bottom */}
      <ActionBar className="fixed bottom-4 left-4 right-4 z-10" />
    </div>
  );
}
