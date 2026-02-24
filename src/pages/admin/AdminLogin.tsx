import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { session, loading, signIn, resetPassword } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate('/admin', { replace: true });
  }, [session, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown) return;
    setError('');
    setSubmitting(true);
    setCooldown(true);
    try {
      await signIn(email, password);
      navigate('/admin', { replace: true });
    } catch {
      setError('Identifiants incorrects');
    } finally {
      setSubmitting(false);
      setTimeout(() => setCooldown(false), 3000);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch {
      setError('Une erreur est survenue');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-display font-bold text-primary">MB</span>
          </div>
          <h1 className="text-xl font-display font-semibold text-foreground">
            Espace Administration
          </h1>
        </CardHeader>
        <CardContent>
          {resetMode ? (
            resetSent ? (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Un email de réinitialisation a été envoyé si ce compte existe.
                </p>
                <Button variant="ghost" onClick={() => { setResetMode(false); setResetSent(false); }}>
                  Retour à la connexion
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Envoyer le lien'}
                </Button>
                <Button variant="ghost" type="button" className="w-full" onClick={() => setResetMode(false)}>
                  Retour
                </Button>
              </form>
            )
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={submitting || cooldown}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Se connecter'}
              </Button>
              <button
                type="button"
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setResetMode(true)}
              >
                Mot de passe oublié ?
              </button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
