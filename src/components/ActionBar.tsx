import { Button } from './Button';
import { useGameStore } from '@/store/gameStore';
import { GameAction } from '@/store/gameStore';

const gameActions: { action: GameAction; label: string; needsTarget?: boolean }[] = [
  { action: 'income', label: 'Income' },
  { action: 'foreign-aid', label: 'Foreign Aid' },
  { action: 'coup', label: 'Coup', needsTarget: true },
  { action: 'tax', label: 'Tax (Duke)' },
  { action: 'assassinate', label: 'Assassinate', needsTarget: true },
  { action: 'exchange', label: 'Exchange (Ambassador)' },
  { action: 'steal', label: 'Steal (Captain)', needsTarget: true }
];

interface ActionBarProps {
  className?: string;
}

export function ActionBar({ className }: ActionBarProps) {
  const { 
    gameState, 
    currentPlayerId, 
    myPlayerId, 
    players,
    chooseAction 
  } = useGameStore();
  
  const isMyTurn = gameState === 'active' && currentPlayerId === myPlayerId;
  const alivePlayers = players.filter(p => p.isAlive && p.id !== myPlayerId);
  
  if (!isMyTurn) return null;
  
  const handleAction = (action: GameAction, needsTarget?: boolean) => {
    if (needsTarget && alivePlayers.length > 0) {
      // For demo, just target the first alive player
      chooseAction(action, { targetId: alivePlayers[0].id });
    } else {
      chooseAction(action);
    }
  };
  
  return (
    <div className={className}>
      <div className="bg-card border border-game-border rounded-2xl p-4 shadow-medium">
        <p className="text-sm font-medium text-card-foreground mb-3">
          Your Turn - Choose an Action
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {gameActions.map(({ action, label, needsTarget }) => (
            <Button
              key={action}
              variant="secondary"
              size="sm"
              onClick={() => handleAction(action, needsTarget)}
              disabled={needsTarget && alivePlayers.length === 0}
              className="text-xs"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}