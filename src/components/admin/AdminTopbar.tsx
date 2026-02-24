import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Menu, ExternalLink, LogOut } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

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

  const basePath = '/' + location.pathname.split('/').slice(1, 3).join('/');
  const title = titles[basePath] || 'Administration';

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-sm font-display font-semibold text-foreground">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <a href="https://mbutheudesign.com" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Voir le site</span>
          </a>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {user?.email?.slice(0, 2).toUpperCase()}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
