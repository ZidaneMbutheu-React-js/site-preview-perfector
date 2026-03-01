import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';
import StatsCard from '@/components/admin/StatsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, FolderOpen, CheckCircle, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { AdminComment } from '@/types/admin';

export default function Dashboard() {
  const { user } = useAdminAuth();
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [recentComments, setRecentComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [pending, approved, articles, projects, comments] = await Promise.all([
        (supabase as any).from('comments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        (supabase as any).from('comments').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
        (supabase as any).from('articles').select('id', { count: 'exact', head: true }),
        (supabase as any).from('projects').select('id', { count: 'exact', head: true }),
        (supabase as any).from('comments').select('*').eq('status', 'pending').order('created_at', { ascending: false }).limit(5),
      ]);
      setPendingCount(pending.count || 0);
      setApprovedCount(approved.count || 0);
      setArticleCount(articles.count || 0);
      setProjectCount(projects.count || 0);
      setRecentComments(comments.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const today = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });
  const firstName = user?.email?.split('@')[0] ?? 'Admin';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#F5A623', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className="font-display text-[28px] font-bold" style={{ color: '#EAE5D9' }}>
          Bonjour {firstName},
        </h1>
        <p className="text-sm mt-1 capitalize" style={{ color: 'rgba(234,229,217,0.6)' }}>
          {today}
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Articles publiés" value={articleCount} icon={FileText} index={0} />
        <StatsCard title="Projets publiés" value={projectCount} icon={FolderOpen} index={1} />
        <StatsCard title="Commentaires en attente" value={pendingCount} icon={MessageSquare} alert index={2} />
        <StatsCard title="Commentaires approuvés" value={approvedCount} icon={CheckCircle} index={3} />
      </div>

      {/* Quick actions */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Button asChild className="font-display" style={{ background: '#F5A623', color: '#060810' }}>
          <Link to="/admin/blog/nouveau"><Plus className="h-4 w-4 mr-1" />Nouvel article</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          style={{ borderColor: 'rgba(245,166,35,0.3)', color: '#EAE5D9' }}
        >
          <Link to="/admin/commentaires?filter=pending">Modérer les commentaires</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          style={{ borderColor: 'rgba(245,166,35,0.3)', color: '#EAE5D9' }}
        >
          <a href="https://mbutheudesign.com" target="_blank" rel="noopener noreferrer">Voir le site</a>
        </Button>
      </motion.div>

      {/* Recent pending comments */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-semibold" style={{ color: '#EAE5D9' }}>
            Commentaires en attente
          </h2>
          <Button variant="ghost" size="sm" asChild style={{ color: '#F5A623' }}>
            <Link to="/admin/commentaires">Voir tout <ArrowRight className="h-3 w-3 ml-1" /></Link>
          </Button>
        </div>

        <div
          className="rounded-2xl overflow-hidden border"
          style={{ background: 'linear-gradient(135deg, #0D1021 0%, #111827 100%)', borderColor: 'rgba(245,166,35,0.15)' }}
        >
          {recentComments.length === 0 ? (
            <div className="p-8 text-center text-sm" style={{ color: 'rgba(234,229,217,0.5)' }}>
              Aucun commentaire en attente
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(245,166,35,0.1)' }}>
                  <th className="text-left px-4 py-3 font-medium" style={{ color: 'rgba(234,229,217,0.5)' }}>Auteur</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell" style={{ color: 'rgba(234,229,217,0.5)' }}>Commentaire</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell" style={{ color: 'rgba(234,229,217,0.5)' }}>Date</th>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: 'rgba(234,229,217,0.5)' }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentComments.map((c, i) => (
                  <tr
                    key={c.id}
                    className="transition-colors duration-150"
                    style={{
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,166,35,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)')}
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: '#EAE5D9' }}>{c.first_name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell" style={{ color: 'rgba(234,229,217,0.6)' }}>
                      {c.content.slice(0, 80)}{c.content.length > 80 ? '…' : ''}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs" style={{ color: 'rgba(234,229,217,0.4)' }}>
                      {format(new Date(c.created_at), 'dd MMM yyyy', { locale: fr })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Badge
                        variant="outline"
                        style={{
                          background: 'rgba(234,179,8,0.1)',
                          borderColor: 'rgba(234,179,8,0.3)',
                          color: '#eab308',
                        }}
                      >
                        En attente
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
