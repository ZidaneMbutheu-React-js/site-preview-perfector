import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  alert?: boolean;
}

export default function StatsCard({ title, value, icon: Icon, alert }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={cn(
          'w-11 h-11 rounded-lg flex items-center justify-center shrink-0',
          alert && value > 0 ? 'bg-destructive/10' : 'bg-primary/10'
        )}>
          <Icon className={cn('h-5 w-5', alert && value > 0 ? 'text-destructive' : 'text-primary')} />
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
        {alert && value > 0 && (
          <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
            {value}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
