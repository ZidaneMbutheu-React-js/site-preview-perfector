import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/admin/useArticles';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Eye, Copy, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function BlogAdmin() {
  const { articles, loading, deleteArticle, duplicateArticle } = useArticles();
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = articles;
    if (tab !== 'all') list = list.filter((a) => a.status === tab);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || a.category?.toLowerCase().includes(q));
    }
    return list;
  }, [articles, tab, search]);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">Tous ({articles.length})</TabsTrigger>
            <TabsTrigger value="published">Publiés</TabsTrigger>
            <TabsTrigger value="draft">Brouillons</TabsTrigger>
            <TabsTrigger value="archived">Archivés</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button asChild>
          <Link to="/admin/blog/nouveau"><Plus className="h-4 w-4 mr-1" />Nouvel article</Link>
        </Button>
      </div>

      <Input placeholder="Rechercher par titre ou catégorie..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead className="hidden md:table-cell">Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Aucun article</TableCell></TableRow>
            ) : (
              filtered.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.title}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{a.category || '—'}</TableCell>
                  <TableCell><Badge variant="outline">{a.status}</Badge></TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {format(new Date(a.created_at), 'dd/MM/yy', { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                        <Link to={`/admin/blog/modifier/${a.id}`}><Pencil className="h-3 w-3" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                        <a href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer"><Eye className="h-3 w-3" /></a>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => duplicateArticle(a.id)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setConfirmDelete(a.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
        title="Supprimer l'article"
        description="Cette action est irréversible. L'article sera définitivement supprimé."
        destructive
        onConfirm={() => { if (confirmDelete) deleteArticle(confirmDelete); setConfirmDelete(null); }}
      />
    </div>
  );
}
