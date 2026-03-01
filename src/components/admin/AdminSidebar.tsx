import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';
import {
  LayoutDashboard, MessageSquare, FileText, FolderOpen,
  Palette, Sparkles, Settings, LogOut, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/commentaires', label: 'Commentaires', icon: MessageSquare },
  { to: '/admin/blog', label: 'Articles Blog', icon: FileText },
  { to: '/admin/projets', label: 'Projets', icon: FolderOpen },
  { to: '/admin/design-system', label: 'Design System', icon: Palette },
  { to: '/admin/animations', label: 'Animations', icon: Sparkles },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: Props) {
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'AD';

  const sidebarContent = (
    <div className="h-full flex flex-col" style={{ background: '#080B18' }}>
      {/* Logo */}
      <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(245,166,35,0.15)' }}>
        <span className="font-display text-lg font-bold tracking-wide" style={{ color: '#F5A623' }}>
          MBUTHEU DESIGN
        </span>
        <Button variant="ghost" size="icon" className="lg:hidden text-[#EAE5D9]/60 hover:text-[#EAE5D9]" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                isActive
                  ? 'border-l-[3px] font-medium'
                  : 'border-l-[3px] border-transparent hover:bg-white/[0.04]'
              )
            }
            style={({ isActive }) =>
              isActive
                ? { background: 'rgba(245,166,35,0.1)', borderLeftColor: '#F5A623', color: '#F5A623' }
                : { color: 'rgba(234,229,217,0.6)' }
            }
          >
            <item.icon className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1" />
            <span className="hidden lg:inline">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-3" style={{ borderTop: '1px solid rgba(245,166,35,0.15)' }}>
        <div className="flex items-center gap-3 px-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(245,166,35,0.1)' }}
          >
            <span className="text-xs font-display font-bold" style={{ color: '#F5A623' }}>{initials}</span>
          </div>
          <div className="min-w-0 hidden lg:block">
            <p className="text-xs font-medium truncate" style={{ color: '#EAE5D9' }}>{user?.email}</p>
            <p className="text-[10px]" style={{ color: 'rgba(234,229,217,0.5)' }}>Administrateur</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
          style={{ color: '#ef4444' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden lg:inline">Déconnexion</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex shrink-0 h-screen sticky top-0 flex-col transition-all duration-300 lg:w-[260px] md:w-16"
        style={{ borderRight: '1px solid rgba(245,166,35,0.15)' }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(6,8,16,0.8)', backdropFilter: 'blur(8px)' }}
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 z-50 h-full w-[260px] md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
