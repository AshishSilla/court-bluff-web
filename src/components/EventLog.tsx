import { useGameStore } from '@/store/gameStore';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface EventLogProps {
  className?: string;
}

export function EventLog({ className }: EventLogProps) {
  const { events } = useGameStore();
  
  if (events.length === 0) return null;
  
  return (
    <div className={cn(
      'bg-card border border-game-border rounded-2xl p-3 shadow-soft',
      className
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Clock size={14} className="text-muted-foreground" />
        <h3 className="font-medium text-sm text-card-foreground">Event Log</h3>
      </div>
      
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {events.slice(0, 5).map((event) => (
          <div 
            key={event.id}
            className="text-xs text-muted-foreground py-1 border-b border-border/30 last:border-b-0"
          >
            <span className="font-mono text-xs opacity-60">
              {new Date(event.timestamp).toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            <span className="ml-2">{event.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}