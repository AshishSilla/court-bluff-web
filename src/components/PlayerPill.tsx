import { cn } from '@/lib/utils';
import { Coins, User } from 'lucide-react';

interface PlayerPillProps {
  name: string;
  coins: number;
  alive: boolean;
  isActive?: boolean;
  isCurrent?: boolean;
  className?: string;
}

export function PlayerPill({ 
  name, 
  coins, 
  alive, 
  isActive = false, 
  isCurrent = false,
  className 
}: PlayerPillProps) {
  return (
    <div className={cn(
      'p-3 rounded-2xl shadow-soft border transition-all duration-200',
      alive ? 'bg-card border-game-border' : 'bg-muted border-border opacity-60',
      isActive && 'ring-2 ring-player-active ring-offset-2',
      isCurrent && 'ring-2 ring-accent ring-offset-2',
      className
    )}>
      <div className="flex items-center gap-2">
        <div className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
          alive ? 'bg-primary text-primary-foreground' : 'bg-player-eliminated text-white'
        )}>
          <User size={16} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={cn(
            'font-medium text-sm truncate',
            alive ? 'text-card-foreground' : 'text-muted-foreground'
          )}>
            {name}
          </p>
          {alive && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Coins size={12} />
              <span>{coins}</span>
            </div>
          )}
        </div>
        
        {!alive && (
          <div className="text-xs font-medium text-player-eliminated">
            OUT
          </div>
        )}
      </div>
    </div>
  );
}