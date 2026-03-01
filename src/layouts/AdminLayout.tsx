import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { scrollY } = useScroll();
  const circle1Y = useTransform(scrollY, [0, 1000], ['0px', '-40px']);
  const circle2Y = useTransform(scrollY, [0, 1000], ['0px', '-25px']);
  const circle3Y = useTransform(scrollY, [0, 1000], ['0px', '-30px']);

  return (
    <div className="min-h-screen flex w-full" style={{ background: '#060810' }}>
      {/* Parallax ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          style={{ y: circle1Y, willChange: 'transform' }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full"
          aria-hidden
        >
          <div className="w-full h-full rounded-full" style={{ background: 'rgba(245,166,35,0.03)', filter: 'blur(80px)' }} />
        </motion.div>
        <motion.div
          style={{ y: circle2Y, willChange: 'transform' }}
          className="absolute -bottom-10 -right-10 w-[300px] h-[300px] rounded-full"
          aria-hidden
        >
          <div className="w-full h-full rounded-full" style={{ background: 'rgba(245,166,35,0.02)', filter: 'blur(100px)' }} />
        </motion.div>
        <motion.div
          style={{ y: circle3Y, willChange: 'transform' }}
          className="absolute top-1/3 right-10 w-[200px] h-[200px] rounded-full"
          aria-hidden
        >
          <div className="w-full h-full rounded-full" style={{ background: 'rgba(59,130,246,0.02)', filter: 'blur(60px)' }} />
        </motion.div>
      </div>

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen min-w-0 relative z-10">
        <AdminTopbar onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            key={undefined}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
