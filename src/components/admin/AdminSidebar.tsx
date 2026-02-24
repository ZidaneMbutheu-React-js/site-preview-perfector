import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';
import {
  LayoutDashboard, MessageSquare, FileText, FolderOpen,
  Palette, Sparkles, Settings, LogOut, ExternalLink, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-background/80 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-60 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-display font-bold text-primary">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Administrateur</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
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
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-1">
          <a
            href="https://mbutheudesign.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Voir le site</span>
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
