import type { AdminComment } from '@/types/admin';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Props {
  comment: AdminComment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  approved: 'bg-green-500/10 text-green-500 border-green-500/30',
  rejected: 'bg-destructive/10 text-destructive border-destructive/30',
};

export default function CommentDetailModal({ comment, open, onOpenChange, onApprove, onReject }: Props) {
  if (!comment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Détail du commentaire</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Auteur</p>
              <p className="font-medium text-foreground">{comment.first_name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{comment.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Site web</p>
              <p className="font-medium text-foreground">{comment.website || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">
                {format(new Date(comment.created_at), 'dd MMM yyyy HH:mm', { locale: fr })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Article</p>
              <p className="font-medium text-foreground">{comment.article_slug}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Statut</p>
              <Badge variant="outline" className={statusColors[comment.status]}>
                {comment.status}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Commentaire</p>
            <div className="p-3 rounded-md bg-muted text-sm text-foreground whitespace-pre-wrap">
              {comment.content}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          {comment.status !== 'approved' && (
            <Button onClick={() => { onApprove(comment.id); onOpenChange(false); }}>
              ✅ Approuver
            </Button>
          )}
          {comment.status !== 'rejected' && (
            <Button variant="destructive" onClick={() => { onReject(comment.id); onOpenChange(false); }}>
              ❌ Rejeter
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
