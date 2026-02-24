import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticles } from '@/hooks/admin/useArticles';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';
import SerpPreview from '@/components/admin/SerpPreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, Save, Upload } from 'lucide-react';
import { slugify } from '@/lib/slugify';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { AdminArticle } from '@/types/admin';

const CATEGORIES = ['Design', 'Développement', 'Branding', 'Marketing', 'Technologie', 'Business'];

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getArticle, saveArticle } = useArticles();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [dirty, setDirty] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    cover_image_url: '',
    cover_image_alt: '',
    meta_title: '',
    meta_description: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    published_at: null as Date | null,
  });

  const articleId = useRef<string | undefined>(id);

  useEffect(() => {
    if (!id) return;
    getArticle(id).then((a) => {
      if (a) {
        setForm({
          title: a.title,
          slug: a.slug,
          content: a.content || '',
          excerpt: a.excerpt || '',
          category: a.category || '',
          tags: a.tags?.join(', ') || '',
          cover_image_url: a.cover_image_url || '',
          cover_image_alt: a.cover_image_alt || '',
          meta_title: a.meta_title || '',
          meta_description: a.meta_description || '',
          status: a.status,
          published_at: a.published_at ? new Date(a.published_at) : null,
        });
        articleId.current = a.id;
      }
      setLoading(false);
    });
  }, [id, getArticle]);

  const update = (key: string, value: any) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !id) next.slug = slugify(value);
      return next;
    });
    setDirty(true);
  };

  const handleSave = useCallback(async (status?: string) => {
    if (!form.title || !form.slug) {
      toast({ title: 'Erreur', description: 'Le titre et le slug sont requis', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const payload: any = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        excerpt: form.excerpt,
        category: form.category || null,
        tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        cover_image_url: form.cover_image_url || null,
        cover_image_alt: form.cover_image_alt || null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        status: status || form.status,
        published_at: form.published_at?.toISOString() || (status === 'published' ? new Date().toISOString() : null),
      };
      if (articleId.current) payload.id = articleId.current;
      const saved = await saveArticle(payload);
      articleId.current = saved.id;
      setLastSaved(new Date());
      setDirty(false);
      toast({ title: 'Sauvegardé ✓' });
      if (!id) navigate(`/admin/blog/modifier/${saved.id}`, { replace: true });
    } catch (err: any) {
      toast({ title: 'Erreur', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }, [form, id, navigate, saveArticle, toast]);

  // Auto-save every 30s
  useEffect(() => {
    if (!dirty || !articleId.current) return;
    const timer = setTimeout(() => handleSave(), 30000);
    return () => clearTimeout(timer);
  }, [dirty, handleSave]);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Save indicator */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-display font-semibold">{id ? 'Modifier l\'article' : 'Nouvel article'}</h1>
        <div className="flex items-center gap-3">
          {lastSaved && <span className="text-xs text-muted-foreground">Sauvegardé à {format(lastSaved, 'HH:mm')}</span>}
          {dirty && <span className="text-xs text-yellow-500">Modifications non sauvegardées</span>}
        </div>
      </div>

      {/* Main info */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Informations</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Titre *</Label>
            <Input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Titre de l'article" />
          </div>
          <div className="space-y-2">
            <Label>Slug URL *</Label>
            <Input value={form.slug} onChange={(e) => update('slug', e.target.value)} placeholder="slug-article" />
            <p className="text-xs text-muted-foreground">mbutheudesign.com/blog/{form.slug}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select value={form.category} onValueChange={(v) => update('category', v)}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tags (séparés par des virgules)</Label>
              <Input value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="design, web, ux" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Extrait</Label>
            <Textarea value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} placeholder="Résumé court..." rows={2} />
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Contenu</CardTitle></CardHeader>
        <CardContent>
          <RichTextEditor content={form.content} onChange={(v) => update('content', v)} />
        </CardContent>
      </Card>

      {/* SEO */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">SEO</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Meta Title <span className="text-xs text-muted-foreground">({form.meta_title.length}/60)</span></Label>
            <Input value={form.meta_title} onChange={(e) => update('meta_title', e.target.value)} maxLength={70} />
            {form.meta_title.length > 60 && <p className="text-xs text-destructive">Trop long pour Google</p>}
          </div>
          <div className="space-y-2">
            <Label>Meta Description <span className="text-xs text-muted-foreground">({form.meta_description.length}/160)</span></Label>
            <Textarea value={form.meta_description} onChange={(e) => update('meta_description', e.target.value)} maxLength={160} rows={2} />
          </div>
          <SerpPreview title={form.meta_title || form.title} slug={form.slug} description={form.meta_description || form.excerpt} />
        </CardContent>
      </Card>

      {/* Cover image */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Image de couverture</CardTitle></CardHeader>
        <CardContent>
          <ImageUploader
            bucket="blog-images"
            value={form.cover_image_url}
            altText={form.cover_image_alt}
            onUpload={(url) => update('cover_image_url', url)}
            onAltChange={(alt) => update('cover_image_alt', alt)}
            showAlt
          />
        </CardContent>
      </Card>

      {/* Publication */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Publication</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select value={form.status} onValueChange={(v: any) => update('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                  <SelectItem value="archived">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date de publication</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn('w-full justify-start text-left', !form.published_at && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.published_at ? format(form.published_at, 'dd MMM yyyy', { locale: fr }) : 'Maintenant'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={form.published_at || undefined} onSelect={(d) => update('published_at', d)} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="outline" onClick={() => handleSave('draft')} disabled={saving}>
              <Save className="h-4 w-4 mr-1" />Enregistrer brouillon
            </Button>
            <Button onClick={() => handleSave('published')} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
              Publier
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
