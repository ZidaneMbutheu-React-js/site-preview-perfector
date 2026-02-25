import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface PublicProjectDetail {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  description: string | null;
  content: Record<string, string> | null;
  images: string[] | null;
  tools: string[] | null;
  external_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<PublicProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('Projet introuvable.');
      return;
    }

    const fetch = async () => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (err) {
        setError('Impossible de charger le projet.');
      } else if (!data) {
        setError('Projet introuvable.');
      } else {
        setProject({
          ...data,
          content: data.content as Record<string, string> | null,
        } as PublicProjectDetail);
      }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { project, loading, error };
}
