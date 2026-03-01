import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  alert?: boolean;
  index?: number;
}

export default function StatsCard({ title, value, icon: Icon, alert, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
    >
      <Card
        className="border transition-all duration-200 cursor-default group"
        style={{
          background: 'linear-gradient(135deg, #0D1021 0%, #111827 100%)',
          borderColor: 'rgba(245,166,35,0.2)',
          borderRadius: '16px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(245,166,35,0.5)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,166,35,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(245,166,35,0.2)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <CardContent className="p-6 flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: alert && value > 0 ? 'rgba(239,68,68,0.1)' : 'rgba(245,166,35,0.1)' }}
          >
            <Icon
              className="h-7 w-7"
              style={{ color: alert && value > 0 ? '#ef4444' : '#F5A623' }}
            />
          </div>
          <div>
            <p className="font-display text-4xl font-bold" style={{ color: alert && value > 0 ? '#ef4444' : '#F5A623' }}>
              {value}
            </p>
            <p className="text-sm mt-1" style={{ color: 'rgba(234,229,217,0.7)', fontFamily: '"DM Sans", sans-serif' }}>
              {title}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
