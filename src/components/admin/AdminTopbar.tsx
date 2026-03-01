import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Menu, ExternalLink, LogOut } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const titles: Record<string, string> = {
  '/admin': 'Tableau de bord',
  '/admin/commentaires': 'Commentaires',
  '/admin/blog': 'Articles Blog',
  '/admin/projets': 'Projets',
  '/admin/design-system': 'Design System',
  '/admin/animations': 'Animations',
  '/admin/parametres': 'Paramètres',
};

interface Props {
  onMenuToggle: () => void;
}

export default function AdminTopbar({ onMenuToggle }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAdminAuth();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const basePath = '/' + location.pathname.split('/').slice(1, 3).join('/');
  const title = titles[basePath] || 'Administration';

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-30"
      style={{ background: '#080B18', borderBottom: '1px solid rgba(245,166,35,0.1)' }}
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          style={{ color: 'rgba(234,229,217,0.7)' }}
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="font-display text-lg font-semibold" style={{ color: '#EAE5D9' }}>
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Real-time date */}
        <span className="hidden sm:block text-xs" style={{ color: 'rgba(234,229,217,0.5)' }}>
          {format(now, "EEEE d MMMM yyyy · HH:mm", { locale: fr })}
        </span>

        <Button variant="ghost" size="sm" asChild className="hidden sm:flex" style={{ color: 'rgba(234,229,217,0.6)' }}>
          <a href="https://mbutheudesign.com" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            Voir le site
          </a>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(245,166,35,0.1)' }}
              >
                <span className="text-xs font-bold" style={{ color: '#F5A623' }}>
                  {user?.email?.slice(0, 2).toUpperCase()}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-border bg-card">
            <DropdownMenuItem onClick={() => navigate('/admin/parametres')}>
              Paramètres
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
