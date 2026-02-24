import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '@/hooks/admin/useProjects';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, Upload } from 'lucide-react';
import { slugify } from '@/lib/slugify';
import { useToast } from '@/hooks/use-toast';

const CATEGORIES = ['Site web', 'Identité visuelle', 'UI/UX App', 'Landing page', 'E-commerce', 'Branding'];

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getProject, saveProject } = useProjects();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '', slug: '', category: '', description: '',
    contexte: '', defi: '', solution: '', resultat: '',
    tools: '', external_url: '', display_order: 0,
    status: 'draft' as string,
    meta_title: '', meta_description: '',
    cover_image: '',
  });

  useEffect(() => {
    if (!id) return;
    getProject(id).then((p) => {
      if (p) {
        const content = (p.content as any) || {};
        setForm({
          title: p.title, slug: p.slug, category: p.category || '',
          description: p.description || '',
          contexte: content.contexte || '', defi: content.defi || '',
          solution: content.solution || '', resultat: content.resultat || '',
          tools: p.tools?.join(', ') || '', external_url: p.external_url || '',
          display_order: p.display_order, status: p.status,
          meta_title: p.meta_title || '', meta_description: p.meta_description || '',
          cover_image: p.images?.[0] || '',
        });
      }
      setLoading(false);
    });
  }, [id, getProject]);

  const update = (key: string, value: any) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !id) next.slug = slugify(value);
      return next;
    });
  };

  const handleSave = async (status?: string) => {
    if (!form.title || !form.slug) {
      toast({ title: 'Erreur', description: 'Titre et slug requis', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const payload: any = {
        title: form.title, slug: form.slug, category: form.category || null,
        description: form.description || null,
        content: { contexte: form.contexte, defi: form.defi, solution: form.solution, resultat: form.resultat },
        images: form.cover_image ? [form.cover_image] : [],
        tools: form.tools ? form.tools.split(',').map((t) => t.trim()).filter(Boolean) : [],
        external_url: form.external_url || null,
        display_order: form.display_order,
        status: status || form.status,
        meta_title: form.meta_title || null, meta_description: form.meta_description || null,
      };
      if (id) payload.id = id;
      const saved = await saveProject(payload);
      toast({ title: 'Sauvegardé ✓' });
      if (!id) navigate(`/admin/projets/modifier/${saved.id}`, { replace: true });
    } catch (err: any) {
      toast({ title: 'Erreur', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-lg font-display font-semibold">{id ? 'Modifier le projet' : 'Nouveau projet'}</h1>

      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Informations</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Titre *</Label><Input value={form.title} onChange={(e) => update('title', e.target.value)} /></div>
          <div className="space-y-2"><Label>Slug *</Label><Input value={form.slug} onChange={(e) => update('slug', e.target.value)} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select value={form.category} onValueChange={(v) => update('category', v)}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Outils</Label><Input value={form.tools} onChange={(e) => update('tools', e.target.value)} placeholder="Figma, Webflow" /></div>
            <div className="space-y-2"><Label>Ordre</Label><Input type="number" value={form.display_order} onChange={(e) => update('display_order', +e.target.value)} /></div>
          </div>
          <div className="space-y-2"><Label>Description courte</Label><Textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={2} /></div>
          <div className="space-y-2"><Label>Lien externe</Label><Input value={form.external_url} onChange={(e) => update('external_url', e.target.value)} placeholder="https://" /></div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Contenu du projet</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {(['contexte', 'defi', 'solution', 'resultat'] as const).map((section) => (
            <div key={section} className="space-y-2">
              <Label className="capitalize">{section === 'defi' ? 'Le Défi' : section === 'resultat' ? 'Le Résultat' : section === 'contexte' ? 'Contexte' : 'La Solution'}</Label>
              <RichTextEditor content={(form as any)[section]} onChange={(v) => update(section, v)} placeholder={`${section}...`} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Image de couverture</CardTitle></CardHeader>
        <CardContent>
          <ImageUploader bucket="project-images" value={form.cover_image} onUpload={(url) => update('cover_image', url)} />
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">SEO & Publication</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Meta Title ({form.meta_title.length}/60)</Label><Input value={form.meta_title} onChange={(e) => update('meta_title', e.target.value)} maxLength={70} /></div>
          <div className="space-y-2"><Label>Meta Description ({form.meta_description.length}/160)</Label><Textarea value={form.meta_description} onChange={(e) => update('meta_description', e.target.value)} maxLength={160} rows={2} /></div>
          <div className="space-y-2">
            <Label>Statut</Label>
            <Select value={form.status} onValueChange={(v) => update('status', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="published">Publié</SelectItem>
                <SelectItem value="archived">Archivé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => handleSave('draft')} disabled={saving}><Save className="h-4 w-4 mr-1" />Brouillon</Button>
            <Button onClick={() => handleSave('published')} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}Publier
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
