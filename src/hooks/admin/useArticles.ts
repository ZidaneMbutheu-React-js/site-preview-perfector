import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AdminArticle } from '@/types/admin';

export function useArticles() {
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    const { data } = await (supabase as any).from('articles').select('*').order('created_at', { ascending: false });
    setArticles((data as AdminArticle[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  const getArticle = useCallback(async (id: string): Promise<AdminArticle | null> => {
    const { data } = await (supabase as any).from('articles').select('*').eq('id', id).single();
    return data as AdminArticle | null;
  }, []);

  const saveArticle = useCallback(async (article: Partial<AdminArticle> & { title: string; slug: string }) => {
    if (article.id) {
      const { data, error } = await (supabase as any).from('articles').update(article).eq('id', article.id).select().single();
      if (error) throw error;
      setArticles((prev) => prev.map((a) => (a.id === data.id ? data : a)));
      return data as AdminArticle;
    } else {
      const { data, error } = await (supabase as any).from('articles').insert(article).select().single();
      if (error) throw error;
      setArticles((prev) => [data, ...prev]);
      return data as AdminArticle;
    }
  }, []);

  const deleteArticle = useCallback(async (id: string) => {
    await (supabase as any).from('articles').delete().eq('id', id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const duplicateArticle = useCallback(async (id: string) => {
    const article = await getArticle(id);
    if (!article) return;
    const { id: _, created_at, updated_at, ...rest } = article;
    const dup = { ...rest, title: `${rest.title} (copie)`, slug: `${rest.slug}-copie-${Date.now()}`, status: 'draft' as const };
    return saveArticle(dup);
  }, [getArticle, saveArticle]);

  return { articles, loading, fetchArticles, getArticle, saveArticle, deleteArticle, duplicateArticle };
}
