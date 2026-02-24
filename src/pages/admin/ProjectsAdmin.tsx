import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/admin/useProjects';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Eye, Trash2, FolderOpen } from 'lucide-react';

export default function ProjectsAdmin() {
  const { projects, loading, deleteProject } = useProjects();
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let list = projects;
    if (tab !== 'all') list = list.filter((p) => p.status === tab);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
    }
    return list;
  }, [projects, tab, search]);

  if (loading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">Tous ({projects.length})</TabsTrigger>
            <TabsTrigger value="published">Publiés</TabsTrigger>
            <TabsTrigger value="draft">Brouillons</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button asChild>
          <Link to="/admin/projets/nouveau"><Plus className="h-4 w-4 mr-1" />Nouveau projet</Link>
        </Button>
      </div>

      <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FolderOpen className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p>Aucun projet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Card key={p.id} className="border-border bg-card overflow-hidden">
              {p.images?.[0] && (
                <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover" />
              )}
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.category || 'Sans catégorie'}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{p.status}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                      <Link to={`/admin/projets/modifier/${p.id}`}><Pencil className="h-3 w-3" /></Link>
                    </Button>
                    {p.external_url && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                        <a href={p.external_url} target="_blank" rel="noopener noreferrer"><Eye className="h-3 w-3" /></a>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setConfirmDelete(p.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
        title="Supprimer le projet"
        description="Cette action est irréversible."
        destructive
        onConfirm={() => { if (confirmDelete) deleteProject(confirmDelete); setConfirmDelete(null); }}
      />
    </div>
  );
}
