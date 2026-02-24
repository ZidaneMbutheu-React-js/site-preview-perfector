import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function SettingsAdmin() {
  const { user, updatePassword } = useAdminAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Profile
  const [profile, setProfile] = useState({ first_name: '', last_name: '', avatar_url: '' });

  // Password
  const [passwords, setPasswords] = useState({ current: '', new_password: '', confirm: '' });

  // Site settings
  const [site, setSite] = useState({
    site_name: 'MBUTHEU DESIGN',
    contact_email: '', notification_email: '',
    behance: '', linkedin: '', instagram: '',
  });

  const [confirmPurge, setConfirmPurge] = useState(false);

  // Load site settings
  useEffect(() => {
    (supabase as any).from('site_settings').select('key, value').then(({ data }: any) => {
      if (!data) return;
      const map: Record<string, string> = {};
      data.forEach((r: any) => { map[r.key] = r.value; });
      setSite((prev) => ({ ...prev, ...map }));
    });
  }, []);

  const saveSiteSettings = async () => {
    setSaving(true);
    try {
      const rows = Object.entries(site).map(([key, value]) => ({ key, value }));
      await (supabase as any).from('site_settings').upsert(rows, { onConflict: 'key' });
      toast({ title: 'Paramètres sauvegardés ✓' });
    } catch {
      toast({ title: 'Erreur', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.new_password.length < 12) {
      toast({ title: 'Erreur', description: 'Le mot de passe doit contenir au moins 12 caractères', variant: 'destructive' });
      return;
    }
    if (passwords.new_password !== passwords.confirm) {
      toast({ title: 'Erreur', description: 'Les mots de passe ne correspondent pas', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await updatePassword(passwords.new_password);
      setPasswords({ current: '', new_password: '', confirm: '' });
      toast({ title: 'Mot de passe mis à jour ✓' });
    } catch (err: any) {
      toast({ title: 'Erreur', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handlePurgeRejected = async () => {
    await (supabase as any).from('comments').delete().eq('status', 'rejected');
    setConfirmPurge(false);
    toast({ title: 'Commentaires rejetés supprimés' });
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Profile */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Profil administrateur</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email || ''} disabled className="opacity-60" />
          </div>
          <ImageUploader bucket="admin-assets" value={profile.avatar_url} onUpload={(url) => setProfile((p) => ({ ...p, avatar_url: url }))} />
        </CardContent>
      </Card>

      {/* Password */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Sécurité</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nouveau mot de passe (min. 12 caractères)</Label>
            <Input type="password" value={passwords.new_password} onChange={(e) => setPasswords((p) => ({ ...p, new_password: e.target.value }))} autoComplete="new-password" />
          </div>
          <div className="space-y-2">
            <Label>Confirmer</Label>
            <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} autoComplete="new-password" />
          </div>
          <Button onClick={handlePasswordChange} disabled={saving || !passwords.new_password}>Changer le mot de passe</Button>
        </CardContent>
      </Card>

      {/* Site settings */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-display">Informations du site</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Nom du site</Label><Input value={site.site_name} onChange={(e) => setSite((s) => ({ ...s, site_name: e.target.value }))} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Email de contact</Label><Input value={site.contact_email} onChange={(e) => setSite((s) => ({ ...s, contact_email: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Email de notification</Label><Input value={site.notification_email} onChange={(e) => setSite((s) => ({ ...s, notification_email: e.target.value }))} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Behance</Label><Input value={site.behance} onChange={(e) => setSite((s) => ({ ...s, behance: e.target.value }))} placeholder="https://" /></div>
            <div className="space-y-2"><Label>LinkedIn</Label><Input value={site.linkedin} onChange={(e) => setSite((s) => ({ ...s, linkedin: e.target.value }))} placeholder="https://" /></div>
            <div className="space-y-2"><Label>Instagram</Label><Input value={site.instagram} onChange={(e) => setSite((s) => ({ ...s, instagram: e.target.value }))} placeholder="https://" /></div>
          </div>
          <Button onClick={saveSiteSettings} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}Enregistrer
          </Button>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30 bg-card">
        <CardHeader><CardTitle className="text-sm font-display text-destructive">Zone de danger</CardTitle></CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => setConfirmPurge(true)}>Vider les commentaires rejetés</Button>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmPurge}
        onOpenChange={setConfirmPurge}
        title="Supprimer tous les commentaires rejetés"
        description="Cette action est irréversible."
        destructive
        onConfirm={handlePurgeRejected}
      />
    </div>
  );
}
