import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PublicProject {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  description: string | null;
  images: string[] | null;
  tools: string[] | null;
  external_url: string | null;
}

export function useProjects() {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('projects')
        .select('id, title, slug, category, description, images, tools, external_url')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (err) {
        setError('Impossible de charger les projets.');
      } else {
        setProjects((data as PublicProject[]) || []);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { projects, loading, error };
}
