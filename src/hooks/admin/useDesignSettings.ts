import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useDesignSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data } = await (supabase as any).from('design_settings').select('key, value');
    const map: Record<string, string> = {};
    (data || []).forEach((r: any) => { map[r.key] = r.value; });
    setSettings(map);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const saveSetting = useCallback(async (key: string, value: string) => {
    await (supabase as any).from('design_settings').upsert({ key, value }, { onConflict: 'key' });
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const saveAll = useCallback(async (values: Record<string, string>) => {
    const rows = Object.entries(values).map(([key, value]) => ({ key, value }));
    await (supabase as any).from('design_settings').upsert(rows, { onConflict: 'key' });
    setSettings(values);
  }, []);

  const resetDefaults = useCallback(async () => {
    await (supabase as any).from('design_settings').delete().neq('key', '');
    setSettings({});
  }, []);

  return { settings, loading, fetchSettings, saveSetting, saveAll, resetDefaults };
}
