import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useComments } from '@/hooks/admin/useComments';
import CommentDetailModal from '@/components/admin/CommentDetailModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Eye, Check, X, Trash2 } from 'lucide-react';
import type { AdminComment } from '@/types/admin';

const PAGE_SIZE = 20;

export default function CommentsAdmin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { comments, loading, updateStatus, deleteComment, bulkUpdate, bulkDelete } = useComments();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(searchParams.get('filter') || 'all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<AdminComment | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmBulk, setConfirmBulk] = useState<{ action: string } | null>(null);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let list = comments;
    if (tab !== 'all') list = list.filter((c) => c.status === tab);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.first_name.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q) ||
        c.article_slug.toLowerCase().includes(q)
      );
    }
    return list;
  }, [comments, tab, search]);

  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pendingCount = comments.filter((c) => c.status === 'pending').length;

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map((c) => c.id)));
  };

  const handleBulk = async () => {
    if (!confirmBulk) return;
    const ids = Array.from(selected);
    if (confirmBulk.action === 'approve') await bulkUpdate(ids, 'approved');
    else if (confirmBulk.action === 'reject') await bulkUpdate(ids, 'rejected');
    else if (confirmBulk.action === 'delete') await bulkDelete(ids);
    setSelected(new Set());
    setConfirmBulk(null);
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    approved: 'bg-green-500/10 text-green-500 border-green-500/30',
    rejected: 'bg-destructive/10 text-destructive border-destructive/30',
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => { setTab(v); setPage(0); setSearchParams(v === 'all' ? {} : { filter: v }); }}>
        <TabsList>
          <TabsTrigger value="all">Tous ({comments.length})</TabsTrigger>
          <TabsTrigger value="pending">
            En attente {pendingCount > 0 && <Badge className="ml-1 h-5 px-1.5 bg-destructive text-destructive-foreground">{pendingCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="approved">Approuvés</TabsTrigger>
          <TabsTrigger value="rejected">Rejetés</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search + bulk */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Rechercher par auteur ou contenu..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          className="max-w-xs"
        />
        {selected.size > 0 && (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setConfirmBulk({ action: 'approve' })}>
              <Check className="h-3 w-3 mr-1" />Approuver ({selected.size})
            </Button>
            <Button size="sm" variant="destructive" onClick={() => setConfirmBulk({ action: 'reject' })}>
              <X className="h-3 w-3 mr-1" />Rejeter ({selected.size})
            </Button>
            <Button size="sm" variant="outline" onClick={() => setConfirmBulk({ action: 'delete' })}>
              <Trash2 className="h-3 w-3 mr-1" />Supprimer ({selected.size})
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox checked={paged.length > 0 && selected.size === paged.length} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead>Auteur</TableHead>
              <TableHead className="hidden md:table-cell">Commentaire</TableHead>
              <TableHead className="hidden lg:table-cell">Article</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Aucun commentaire
                </TableCell>
              </TableRow>
            ) : (
              paged.map((c) => (
                <TableRow key={c.id}>
                  <TableCell><Checkbox checked={selected.has(c.id)} onCheckedChange={() => toggleSelect(c.id)} /></TableCell>
                  <TableCell className="font-medium">{c.first_name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate text-muted-foreground">{c.content.slice(0, 100)}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">{c.article_slug}</TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {format(new Date(c.created_at), 'dd/MM/yy', { locale: fr })}
                  </TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[c.status]}>{c.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDetail(c)}><Eye className="h-3 w-3" /></Button>
                      {c.status !== 'approved' && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-green-500" onClick={() => updateStatus(c.id, 'approved')}>
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      {c.status !== 'rejected' && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => updateStatus(c.id, 'rejected')}>
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setConfirmDelete(c.id)}>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} variant={page === i ? 'default' : 'outline'} size="sm" onClick={() => setPage(i)}>
              {i + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Modals */}
      <CommentDetailModal
        comment={detail}
        open={!!detail}
        onOpenChange={(open) => !open && setDetail(null)}
        onApprove={(id) => updateStatus(id, 'approved')}
        onReject={(id) => updateStatus(id, 'rejected')}
      />
      <ConfirmDialog
        open={!!confirmDelete}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
        title="Supprimer le commentaire"
        description="Cette action est irréversible."
        destructive
        onConfirm={() => { if (confirmDelete) deleteComment(confirmDelete); setConfirmDelete(null); }}
      />
      <ConfirmDialog
        open={!!confirmBulk}
        onOpenChange={(open) => !open && setConfirmBulk(null)}
        title="Action groupée"
        description={`Confirmer l'action sur ${selected.size} commentaire(s) ?`}
        destructive={confirmBulk?.action === 'delete'}
        onConfirm={handleBulk}
      />
    </div>
  );
}
