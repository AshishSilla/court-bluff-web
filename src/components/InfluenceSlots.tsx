import { cn } from '@/lib/utils';

interface InfluenceSlotsProps {
  count: number;
  mine?: boolean;
  className?: string;
}

export function InfluenceSlots({ count, mine = false, className }: InfluenceSlotsProps) {
  const slots = Array.from({ length: Math.max(count, 0) }, (_, i) => i);
  const maxSlots = 2; // Standard Coup rules
  
  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: maxSlots }, (_, i) => (
        <div
          key={i}
          className={cn(
            'w-3 h-4 rounded-sm border transition-all duration-200',
            i < count 
              ? mine 
                ? 'bg-accent border-accent' 
                : 'bg-primary border-primary'
              : 'bg-muted border-border'
          )}
        />
      ))}
    </div>
  );
}