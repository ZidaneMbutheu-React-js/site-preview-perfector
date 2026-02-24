import { useState, useEffect } from 'react';
import { useDesignSettings } from '@/hooks/admin/useDesignSettings';
import ColorPicker from '@/components/admin/ColorPicker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

const HEADING_FONTS = ['Syne', 'Playfair Display', 'Space Grotesk', 'DM Serif Display', 'Bebas Neue'];
const BODY_FONTS = ['DM Sans', 'Manrope', 'Nunito', 'Inter', 'Lato'];

const defaults: Record<string, string> = {
  accent_color: '#d4a017',
  secondary_color: '#1e293b',
  bg_color: '#0a0d14',
  text_color: '#e8e0d0',
  cta_color: '#d4a017',
  font_heading: 'Syne',
  font_body: 'Inter',
  font_size_base: '16',
  border_radius: '12',
  section_spacing: 'medium',
  theme: 'dark',
};

export default function DesignSystemAdmin() {
  const { settings, loading, saveAll, resetDefaults } = useDesignSettings();
  const { toast } = useToast();
  const [local, setLocal] = useState<Record<string, string>>(defaults);
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!loading) setLocal({ ...defaults, ...settings });
  }, [settings, loading]);

  const set = (key: string, value: string) => setLocal((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveAll(local);
      toast({ title: 'Design sauvegardé ✓' });
    } catch {
      toast({ title: 'Erreur', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    await resetDefaults();
    setLocal(defaults);
    setConfirmReset(false);
    toast({ title: 'Valeurs par défaut restaurées' });
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Colors */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Couleurs</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorPicker label="Accent principale" value={local.accent_color} onChange={(v) => set('accent_color', v)} />
          <ColorPicker label="Accent secondaire" value={local.secondary_color} onChange={(v) => set('secondary_color', v)} />
          <ColorPicker label="Fond" value={local.bg_color} onChange={(v) => set('bg_color', v)} />
          <ColorPicker label="Texte principal" value={local.text_color} onChange={(v) => set('text_color', v)} />
          <ColorPicker label="CTA (boutons)" value={local.cta_color} onChange={(v) => set('cta_color', v)} />
        </CardContent>
      </Card>

      {/* Typography */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Typographie</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Police des titres</Label>
              <Select value={local.font_heading} onValueChange={(v) => set('font_heading', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{HEADING_FONTS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Police du corps</Label>
              <Select value={local.font_body} onValueChange={(v) => set('font_body', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{BODY_FONTS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Taille de base : {local.font_size_base}px</Label>
            <Slider min={14} max={18} step={1} value={[+local.font_size_base]} onValueChange={([v]) => set('font_size_base', String(v))} />
          </div>
          {/* Preview */}
          <div className="p-4 rounded-lg border border-border" style={{ fontFamily: local.font_body }}>
            <h3 style={{ fontFamily: local.font_heading, color: local.accent_color }} className="text-xl font-bold mb-2">Titre d'exemple H1</h3>
            <p style={{ fontSize: `${local.font_size_base}px`, color: local.text_color }}>
              Paragraphe d'exemple avec la police sélectionnée pour le corps du texte.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Spacing & shape */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Formes & Espacements</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Border radius : {local.border_radius}px</Label>
            <Slider min={0} max={24} step={1} value={[+local.border_radius]} onValueChange={([v]) => set('border_radius', String(v))} />
          </div>
          <div className="space-y-2">
            <Label>Espacement sections</Label>
            <Select value={local.section_spacing} onValueChange={(v) => set('section_spacing', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="xlarge">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Preview */}
          <div className="flex gap-3">
            <div className="p-4 border border-border" style={{ borderRadius: `${local.border_radius}px`, background: local.bg_color }}>
              <button style={{ borderRadius: `${local.border_radius}px`, background: local.cta_color, color: local.bg_color, padding: '8px 16px', fontWeight: 600 }}>
                Bouton CTA
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Thème</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Label>Mode sombre</Label>
            <Switch checked={local.theme === 'dark'} onCheckedChange={(checked) => set('theme', checked ? 'dark' : 'light')} />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
          Appliquer et sauvegarder
        </Button>
        <Button variant="outline" onClick={() => setConfirmReset(true)}>Réinitialiser les valeurs par défaut</Button>
      </div>

      <ConfirmDialog
        open={confirmReset}
        onOpenChange={setConfirmReset}
        title="Réinitialiser le design"
        description="Toutes les personnalisations seront perdues."
        destructive
        onConfirm={handleReset}
      />
    </div>
  );
}
