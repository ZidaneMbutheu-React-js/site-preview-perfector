interface Props {
  title: string;
  slug: string;
  description: string;
  basePath?: string;
}

export default function SerpPreview({ title, slug, description, basePath = 'mbutheudesign.com/blog' }: Props) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border space-y-1">
      <p className="text-xs text-muted-foreground mb-2 font-medium">Aperçu Google</p>
      <p className="text-primary text-base font-medium truncate" style={{ maxWidth: '600px' }}>
        {title || 'Titre de l\'article'}
      </p>
      <p className="text-xs text-green-500 truncate">
        {basePath}/{slug || 'slug-article'}
      </p>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {description || 'Meta description de l\'article...'}
      </p>
    </div>
  );
}
