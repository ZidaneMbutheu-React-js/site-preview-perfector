import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import StatsCard from '@/components/admin/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, FolderOpen, Plus, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { AdminComment, AdminArticle } from '@/types/admin';

export default function Dashboard() {
  const [pendingCount, setPendingCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [recentComments, setRecentComments] = useState<AdminComment[]>([]);
  const [recentArticles, setRecentArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [pending, articles, projects, comments, arts] = await Promise.all([
        (supabase as any).from('comments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        (supabase as any).from('articles').select('id', { count: 'exact', head: true }),
        (supabase as any).from('projects').select('id', { count: 'exact', head: true }),
        (supabase as any).from('comments').select('*').order('created_at', { ascending: false }).limit(5),
        (supabase as any).from('articles').select('*').order('created_at', { ascending: false }).limit(3),
      ]);
      setPendingCount(pending.count || 0);
      setArticleCount(articles.count || 0);
      setProjectCount(projects.count || 0);
      setRecentComments(comments.data || []);
      setRecentArticles(arts.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    approved: 'bg-green-500/10 text-green-500 border-green-500/30',
    rejected: 'bg-destructive/10 text-destructive border-destructive/30',
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Commentaires en attente" value={pendingCount} icon={MessageSquare} alert />
        <StatsCard title="Articles publiés" value={articleCount} icon={FileText} />
        <StatsCard title="Projets publiés" value={projectCount} icon={FolderOpen} />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/admin/blog/nouveau"><Plus className="h-4 w-4 mr-1" />Nouvel article</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/admin/commentaires?filter=pending">Modérer les commentaires</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://mbutheudesign.com" target="_blank" rel="noopener noreferrer">Voir le site</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent comments */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-display">Derniers commentaires</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/commentaires">Voir tout <ArrowRight className="h-3 w-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentComments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun commentaire</p>
            ) : (
              recentComments.map((c) => (
                <div key={c.id} className="flex items-start justify-between gap-2 text-sm">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{c.first_name}</p>
                    <p className="text-muted-foreground truncate">{c.content.slice(0, 80)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {format(new Date(c.created_at), 'dd MMM yyyy', { locale: fr })}
                    </p>
                  </div>
                  <Badge variant="outline" className={statusColors[c.status]}>{c.status}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent articles */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-display">Derniers articles</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/blog">Voir tout <ArrowRight className="h-3 w-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentArticles.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun article</p>
            ) : (
              recentArticles.map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-2 text-sm">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {a.category} · {format(new Date(a.created_at), 'dd MMM yyyy', { locale: fr })}
                    </p>
                  </div>
                  <Badge variant="outline">{a.status}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
