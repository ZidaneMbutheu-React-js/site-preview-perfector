import { useState, useEffect } from 'react';
import { useAnimationSettings } from '@/hooks/admin/useAnimationSettings';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import ColorPicker from '@/components/admin/ColorPicker';

const defaults: Record<string, string> = {
  hero_parallax_enabled: 'true',
  hero_parallax_intensity: '0.3',
  about_parallax_enabled: 'true',
  about_parallax_intensity: '0.2',
  projects_parallax_enabled: 'true',
  projects_parallax_intensity: '0.2',
  parallax_direction: 'vertical',
  scroll_fade_enabled: 'true',
  scroll_slide_enabled: 'true',
  stagger_delay: '0.1',
  transition_duration: '0.6',
  custom_cursor_enabled: 'false',
  custom_cursor_color: '#d4a017',
  smooth_scroll_enabled: 'true',
  particles_enabled: 'false',
  disable_all: 'false',
};

export default function AnimationsAdmin() {
  const { settings, loading, saveAll } = useAnimationSettings();
  const { toast } = useToast();
  const [local, setLocal] = useState(defaults);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) setLocal({ ...defaults, ...settings });
  }, [settings, loading]);

  const set = (key: string, value: string) => setLocal((prev) => ({ ...prev, [key]: value }));
  const bool = (key: string) => local[key] === 'true';

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveAll(local);
      toast({ title: 'Animations sauvegardées ✓' });
    } catch {
      toast({ title: 'Erreur', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Global disable */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Performance & Accessibilité</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Désactiver toutes les animations</Label>
            <Switch checked={bool('disable_all')} onCheckedChange={(v) => set('disable_all', String(v))} />
          </div>
          <p className="text-xs text-muted-foreground">Les animations sont automatiquement désactivées si l'utilisateur a activé « prefers-reduced-motion » dans son OS.</p>
        </CardContent>
      </Card>

      {/* Parallax */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Parallaxe</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {(['hero', 'about', 'projects'] as const).map((section) => (
            <div key={section} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="capitalize">Section {section}</Label>
                <Switch checked={bool(`${section}_parallax_enabled`)} onCheckedChange={(v) => set(`${section}_parallax_enabled`, String(v))} />
              </div>
              {bool(`${section}_parallax_enabled`) && (
                <div className="pl-4 space-y-1">
                  <Label className="text-xs">Intensité : {local[`${section}_parallax_intensity`]}</Label>
                  <Slider min={0.1} max={0.8} step={0.05}
                    value={[+local[`${section}_parallax_intensity`]]}
                    onValueChange={([v]) => set(`${section}_parallax_intensity`, String(v))} />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scroll animations */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Animations au scroll</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><Label>Fade In</Label><Switch checked={bool('scroll_fade_enabled')} onCheckedChange={(v) => set('scroll_fade_enabled', String(v))} /></div>
          <div className="flex items-center justify-between"><Label>Slide Up</Label><Switch checked={bool('scroll_slide_enabled')} onCheckedChange={(v) => set('scroll_slide_enabled', String(v))} /></div>
          <div className="space-y-1">
            <Label className="text-xs">Délai stagger : {local.stagger_delay}s</Label>
            <Slider min={0.05} max={0.3} step={0.01} value={[+local.stagger_delay]} onValueChange={([v]) => set('stagger_delay', String(v))} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Durée transition : {local.transition_duration}s</Label>
            <Slider min={0.3} max={1.2} step={0.05} value={[+local.transition_duration]} onValueChange={([v]) => set('transition_duration', String(v))} />
          </div>
        </CardContent>
      </Card>

      {/* Special effects */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Effets spéciaux</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><Label>Curseur personnalisé</Label><Switch checked={bool('custom_cursor_enabled')} onCheckedChange={(v) => set('custom_cursor_enabled', String(v))} /></div>
          {bool('custom_cursor_enabled') && (
            <ColorPicker label="Couleur du curseur" value={local.custom_cursor_color} onChange={(v) => set('custom_cursor_color', v)} />
          )}
          <div className="flex items-center justify-between"><Label>Smooth scroll</Label><Switch checked={bool('smooth_scroll_enabled')} onCheckedChange={(v) => set('smooth_scroll_enabled', String(v))} /></div>
          <div className="flex items-center justify-between"><Label>Particules de fond</Label><Switch checked={bool('particles_enabled')} onCheckedChange={(v) => set('particles_enabled', String(v))} /></div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
          Enregistrer les réglages
        </Button>
        <Button variant="outline" asChild>
          <a href="https://mbutheudesign.com" target="_blank" rel="noopener noreferrer">Prévisualiser</a>
        </Button>
      </div>
    </div>
  );
}
