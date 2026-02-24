import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AdminComment } from '@/types/admin';

export function useComments() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const { data } = await (supabase as any).from('comments').select('*').order('created_at', { ascending: false });
    setComments((data as AdminComment[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel('admin-comments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, () => {
        fetchComments();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchComments]);

  const updateStatus = useCallback(async (id: string, status: string) => {
    await (supabase as any).from('comments').update({ status }).eq('id', id);
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: status as any } : c)));
  }, []);

  const deleteComment = useCallback(async (id: string) => {
    await (supabase as any).from('comments').delete().eq('id', id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const bulkUpdate = useCallback(async (ids: string[], status: string) => {
    await (supabase as any).from('comments').update({ status }).in('id', ids);
    setComments((prev) => prev.map((c) => (ids.includes(c.id) ? { ...c, status: status as any } : c)));
  }, []);

  const bulkDelete = useCallback(async (ids: string[]) => {
    await (supabase as any).from('comments').delete().in('id', ids);
    setComments((prev) => prev.filter((c) => !ids.includes(c.id)));
  }, []);

  return { comments, loading, fetchComments, updateStatus, deleteComment, bulkUpdate, bulkDelete };
}
