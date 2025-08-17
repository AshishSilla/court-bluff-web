import { cn } from '@/lib/utils';

interface CardBackProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-8 h-12',
  md: 'w-12 h-18',
  lg: 'w-16 h-24'
};

export function CardBack({ size = 'md', className }: CardBackProps) {
  return (
    <div className={cn(
      'rounded-lg shadow-soft border border-game-border',
      'bg-gradient-to-br from-primary to-primary-hover',
      'flex items-center justify-center relative overflow-hidden',
      sizes[size],
      className
    )}>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-2 border border-primary-foreground rounded-md" />
        <div className="absolute inset-4 border border-primary-foreground rounded-sm" />
      </div>
      
      {/* Crown icon */}
      <div className="text-primary-foreground opacity-60">
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className={cn(
            size === 'sm' ? 'w-3 h-3' : 
            size === 'md' ? 'w-4 h-4' : 'w-6 h-6'
          )}
        >
          <path d="M5 16L3 12h2l1.5 3L12 8l5.5 7L19 12h2l-2 4H5z"/>
          <path d="M3 20h18v2H3z"/>
        </svg>
      </div>
    </div>
  );
}