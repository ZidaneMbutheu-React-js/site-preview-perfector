import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AdminProject } from '@/types/admin';

export function useProjects() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data } = await (supabase as any).from('projects').select('*').order('display_order', { ascending: true });
    setProjects((data as AdminProject[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const getProject = useCallback(async (id: string): Promise<AdminProject | null> => {
    const { data } = await (supabase as any).from('projects').select('*').eq('id', id).single();
    return data as AdminProject | null;
  }, []);

  const saveProject = useCallback(async (project: Partial<AdminProject> & { title: string; slug: string }) => {
    if (project.id) {
      const { data, error } = await (supabase as any).from('projects').update(project).eq('id', project.id).select().single();
      if (error) throw error;
      setProjects((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      return data as AdminProject;
    } else {
      const { data, error } = await (supabase as any).from('projects').insert(project).select().single();
      if (error) throw error;
      setProjects((prev) => [data, ...prev]);
      return data as AdminProject;
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    await (supabase as any).from('projects').delete().eq('id', id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { projects, loading, fetchProjects, getProject, saveProject, deleteProject };
}
