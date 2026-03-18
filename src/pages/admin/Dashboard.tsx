import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';
import StatsCard from '@/components/admin/StatsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, FolderOpen, CheckCircle, Plus, ArrowRight, List, Heading, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { AdminComment } from '@/types/admin';
import { extractHeadings } from '@/components/blog/ArticleTOC';
import { behanceProjects, categories } from '@/data/behanceProjects';

interface ArticleStructure {
  id: string;
  title: string;
  slug: string;
  status: string;
  content: string | null;
  h2Count: number;
  h3Count: number;
  totalHeadings: number;
}

export default function Dashboard() {
  const { user } = useAdminAuth();
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [recentComments, setRecentComments] = useState<AdminComment[]>([]);
  const [articleStructures, setArticleStructures] = useState<ArticleStructure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [pending, approved, articles, projects, comments, allArticles] = await Promise.all([
        (supabase as any).from('comments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        (supabase as any).from('comments').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
        (supabase as any).from('articles').select('id', { count: 'exact', head: true }),
        (supabase as any).from('projects').select('id', { count: 'exact', head: true }),
        (supabase as any).from('comments').select('*').eq('status', 'pending').order('created_at', { ascending: false }).limit(5),
        (supabase as any).from('articles').select('id, title, slug, status, content').order('created_at', { ascending: false }).limit(10),
      ]);
      setPendingCount(pending.count || 0);
      setApprovedCount(approved.count || 0);
      setArticleCount(articles.count || 0);
      setProjectCount(projects.count || 0);
      setRecentComments(comments.data || []);

      // Parse article structures
      const structures: ArticleStructure[] = (allArticles.data || []).map((a: any) => {
        const headings = a.content ? extractHeadings(a.content) : [];
        const h2Count = headings.filter((h) => h.level === 2).length;
        const h3Count = headings.filter((h) => h.level === 3).length;
        return { ...a, h2Count, h3Count, totalHeadings: headings.length };
      });
      setArticleStructures(structures);
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
        <h1 className="font-display text-[28px] font-bold" style={{ color: '#EAE5D9' }}>
          Bonjour {firstName},
        </h1>
        <p className="text-sm mt-1 capitalize" style={{ color: 'rgba(234,229,217,0.6)' }}>{today}</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Articles publiés" value={articleCount} icon={FileText} index={0} />
        <StatsCard title="Projets Behance" value={behanceProjects.length} icon={FolderOpen} index={1} />
        <StatsCard title="Commentaires en attente" value={pendingCount} icon={MessageSquare} alert index={2} />
        <StatsCard title="Commentaires approuvés" value={approvedCount} icon={CheckCircle} index={3} />
      </div>

      {/* Behance Portfolio Overview */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Palette size={16} style={{ color: '#F5A623' }} />
            <h2 className="font-display text-base font-semibold" style={{ color: '#EAE5D9' }}>
              Portfolio Behance — par catégorie
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild style={{ color: '#F5A623' }}>
            <a href="https://www.behance.net/zidanembutheu" target="_blank" rel="noopener noreferrer">Behance <ArrowRight className="h-3 w-3 ml-1" /></a>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.filter(c => c !== "Tous").map((cat) => {
            const count = behanceProjects.filter(p => p.category === cat).length;
            return (
              <div
                key={cat}
                className="rounded-2xl border p-5 flex flex-col gap-2"
                style={{ background: 'linear-gradient(135deg, #0D1021 0%, #111827 100%)', borderColor: 'rgba(245,166,35,0.15)' }}
              >
                <span className="text-xs font-medium" style={{ color: 'rgba(234,229,217,0.5)' }}>{cat}</span>
                <span className="font-display text-2xl font-bold" style={{ color: '#F5A623' }}>{count}</span>
                <span className="text-xs" style={{ color: 'rgba(234,229,217,0.4)' }}>projet{count > 1 ? 's' : ''}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
        <Button asChild className="font-display" style={{ background: '#F5A623', color: '#060810' }}>
          <Link to="/admin/blog/nouveau"><Plus className="h-4 w-4 mr-1" />Nouvel article</Link>
        </Button>
        <Button variant="outline" asChild style={{ borderColor: 'rgba(245,166,35,0.3)', color: '#EAE5D9' }}>
          <Link to="/admin/commentaires?filter=pending">Modérer les commentaires</Link>
        </Button>
        <Button variant="outline" asChild style={{ borderColor: 'rgba(245,166,35,0.3)', color: '#EAE5D9' }}>
          <a href="https://mbutheudesign.com" target="_blank" rel="noopener noreferrer">Voir le site</a>
        </Button>
      </motion.div>

      {/* Article Structure Overview */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.4 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <List size={16} style={{ color: '#F5A623' }} />
            <h2 className="font-display text-base font-semibold" style={{ color: '#EAE5D9' }}>
              Structure des articles (Sommaire)
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild style={{ color: '#F5A623' }}>
            <Link to="/admin/blog">Gérer <ArrowRight className="h-3 w-3 ml-1" /></Link>
          </Button>
        </div>

        <div
          className="rounded-2xl overflow-hidden border"
          style={{ background: 'linear-gradient(135deg, #0D1021 0%, #111827 100%)', borderColor: 'rgba(245,166,35,0.15)' }}
        >
          {articleStructures.length === 0 ? (
            <div className="p-8 text-center text-sm" style={{ color: 'rgba(234,229,217,0.5)' }}>
              Aucun article trouvé
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(245,166,35,0.1)' }}>
                  <th className="text-left px-4 py-3 font-medium" style={{ color: 'rgba(234,229,217,0.5)' }}>Article</th>
                  <th className="text-center px-4 py-3 font-medium hidden sm:table-cell" style={{ color: 'rgba(234,229,217,0.5)' }}>H2</th>
                  <th className="text-center px-4 py-3 font-medium hidden sm:table-cell" style={{ color: 'rgba(234,229,217,0.5)' }}>H3</th>
                  <th className="text-center px-4 py-3 font-medium" style={{ color: 'rgba(234,229,217,0.5)' }}>Sections</th>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: 'rgba(234,229,217,0.5)' }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {articleStructures.map((a, i) => (
                  <tr
                    key={a.id}
                    className="transition-colors duration-150"
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,166,35,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)')}
                  >
                    <td className="px-4 py-3">
                      <Link to={`/admin/blog/${a.id}`} className="font-medium hover:underline" style={{ color: '#EAE5D9' }}>
                        {a.title.length > 45 ? a.title.slice(0, 45) + '…' : a.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: a.h2Count > 0 ? '#F5A623' : 'rgba(234,229,217,0.3)' }}>
                        <Heading size={12} />
                        {a.h2Count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className="text-xs" style={{ color: a.h3Count > 0 ? 'rgba(234,229,217,0.6)' : 'rgba(234,229,217,0.3)' }}>
                        {a.h3Count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant="outline"
                        style={{
                          background: a.totalHeadings >= 5 ? 'rgba(34,197,94,0.1)' : a.totalHeadings > 0 ? 'rgba(234,179,8,0.1)' : 'rgba(239,68,68,0.1)',
                          borderColor: a.totalHeadings >= 5 ? 'rgba(34,197,94,0.3)' : a.totalHeadings > 0 ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)',
                          color: a.totalHeadings >= 5 ? '#22c55e' : a.totalHeadings > 0 ? '#eab308' : '#ef4444',
                        }}
                      >
                        {a.totalHeadings}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Badge
                        variant="outline"
                        style={{
                          background: a.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                          borderColor: a.status === 'published' ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)',
                          color: a.status === 'published' ? '#22c55e' : '#eab308',
                        }}
                      >
                        {a.status === 'published' ? 'Publié' : a.status === 'draft' ? 'Brouillon' : 'Archivé'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* Recent pending comments */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }}>
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
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
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
                      <Badge variant="outline" style={{ background: 'rgba(234,179,8,0.1)', borderColor: 'rgba(234,179,8,0.3)', color: '#eab308' }}>
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
