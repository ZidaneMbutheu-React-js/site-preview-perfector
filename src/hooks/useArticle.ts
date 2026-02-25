import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PublicArticleDetail {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  tags: string[] | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
}

export function useArticle(slug: string | undefined) {
  const [article, setArticle] = useState<PublicArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('Article introuvable.');
      return;
    }

    const fetch = async () => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (err) {
        setError('Impossible de charger l\'article.');
      } else if (!data) {
        setError('Article introuvable.');
      } else {
        setArticle(data as PublicArticleDetail);
      }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { article, loading, error };
}
