import { cn } from '@/lib/utils';

interface TimerRingProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16'
};

const strokeWidths = {
  sm: 2,
  md: 3,
  lg: 4
};

export function TimerRing({ progress, size = 'md', className }: TimerRingProps) {
  const radius = size === 'sm' ? 14 : size === 'md' ? 22 : 30;
  const strokeWidth = strokeWidths[size];
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={cn('relative', sizes[size], className)}>
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        {/* Background ring */}
        <circle
          stroke="hsl(var(--border))"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        
        {/* Progress ring */}
        <circle
          stroke="hsl(var(--accent))"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-300 ease-linear"
        />
      </svg>
      
      {/* Timer text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn(
          'font-mono font-bold text-accent',
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
        )}>
          {Math.ceil(progress / 100 * 30)}
        </span>
      </div>
    </div>
  );
}