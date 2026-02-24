import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2 } from 'lucide-react';

interface Props {
  bucket: string;
  value: string | null;
  altText?: string;
  onUpload: (url: string) => void;
  onAltChange?: (alt: string) => void;
  showAlt?: boolean;
}

export default function ImageUploader({ bucket, value, altText, onUpload, onAltChange, showAlt }: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
      onUpload(publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img src={value} alt={altText || ''} className="w-full h-48 object-cover" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={() => onUpload('')}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-sm">Cliquez pour uploader</span>
            </>
          )}
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      {showAlt && (
        <div className="space-y-1">
          <Label className="text-xs">Texte alternatif (SEO)</Label>
          <Input
            value={altText || ''}
            onChange={(e) => onAltChange?.(e.target.value)}
            placeholder="Description de l'image"
            className="text-sm"
          />
        </div>
      )}
    </div>
  );
}
