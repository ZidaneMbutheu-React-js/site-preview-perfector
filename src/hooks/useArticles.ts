import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PublicArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  tags: string[] | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  published_at: string | null;
}

export function useArticles() {
  const [articles, setArticles] = useState<PublicArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, category, tags, cover_image_url, cover_image_alt, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (err) {
        setError('Impossible de charger les articles.');
      } else {
        setArticles((data as PublicArticle[]) || []);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { articles, loading, error };
}
