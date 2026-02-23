import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, CheckCircle, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const commentSchema = z.object({
  first_name: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères").max(50),
  email: z.string().trim().email("Adresse email invalide").max(255),
  website: z.string().trim().url("URL invalide").max(255).optional().or(z.literal("")),
  content: z.string().trim().min(20, "Le commentaire doit contenir au moins 20 caractères").max(500, "Maximum 500 caractères"),
});

interface Comment {
  id: string;
  first_name: string;
  content: string;
  website: string | null;
  created_at: string;
}

interface CommentSectionProps {
  articleSlug: string;
}

export default function CommentSection({ articleSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [content, setContent] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments_public")
      .select("id, first_name, content, website, created_at")
      .eq("article_slug", articleSlug)
      .order("created_at", { ascending: false });

    setComments((data as Comment[]) ?? []);
    setLoading(false);
  }, [articleSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    const result = commentSchema.safeParse({
      first_name: firstName,
      email,
      website: website || undefined,
      content,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const { error } = await supabase.from("comments").insert({
      article_slug: articleSlug,
      first_name: result.data.first_name,
      email: result.data.email,
      website: result.data.website || null,
      content: result.data.content,
    });

    setSubmitting(false);

    if (!error) {
      setSubmitted(true);
      setFirstName("");
      setEmail("");
      setWebsite("");
      setContent("");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
        <MessageCircle size={22} className="text-gold" />
        {comments.length > 0
          ? `${comments.length} commentaire${comments.length > 1 ? "s" : ""}`
          : "Commentaires"}
      </h2>

      {/* Approved comments */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="card-glass rounded-xl border border-border p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
              <div className="h-3 w-full bg-muted rounded mb-2" />
              <div className="h-3 w-2/3 bg-muted rounded" />
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          Soyez le premier à commenter ! 💬
        </p>
      ) : (
        <div className="space-y-4 mb-12">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-glass rounded-xl border border-border p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center text-sm font-bold">
                    {getInitials(comment.first_name)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {comment.first_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(comment.created_at)}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {comment.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Comment form */}
      <div className="card-glass rounded-2xl border border-border p-6 mt-8">
        <h3 className="font-display font-bold text-foreground text-lg mb-5 flex items-center gap-2">
          <User size={18} className="text-gold" />
          Laisser un commentaire
        </h3>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400"
          >
            <CheckCircle size={20} />
            <p className="text-sm">
              Votre commentaire sera affiché après modération. Merci !
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Honeypot - hidden from real users */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="hp_website">Ne pas remplir</label>
              <input
                id="hp_website"
                name="hp_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="comment_name" className="block text-sm font-medium text-foreground mb-1.5">
                  Prénom <span className="text-red-400">*</span>
                </label>
                <input
                  id="comment_name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  aria-required="true"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
                  placeholder="Votre prénom"
                />
                {errors.first_name && (
                  <p className="text-red-400 text-xs mt-1">{errors.first_name}</p>
                )}
              </div>
              <div>
                <label htmlFor="comment_email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email <span className="text-red-400">*</span>
                  <span className="text-muted-foreground font-normal ml-1">(non affiché)</span>
                </label>
                <input
                  id="comment_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="comment_website" className="block text-sm font-medium text-foreground mb-1.5">
                Site web <span className="text-muted-foreground font-normal">(optionnel)</span>
              </label>
              <input
                id="comment_website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
                placeholder="https://votre-site.com"
              />
              {errors.website && (
                <p className="text-red-400 text-xs mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <label htmlFor="comment_content" className="block text-sm font-medium text-foreground mb-1.5">
                Commentaire <span className="text-red-400">*</span>
              </label>
              <textarea
                id="comment_content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                aria-required="true"
                rows={4}
                maxLength={500}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 resize-none"
                placeholder="Partagez votre avis (min. 20 caractères)..."
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                {errors.content && (
                  <p className="text-red-400">{errors.content}</p>
                )}
                <span className="ml-auto">
                  {content.length}/500
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-primary-foreground text-sm font-medium hover:bg-gold/90 transition-all duration-300 disabled:opacity-50"
            >
              <Send size={14} />
              {submitting ? "Envoi…" : "Soumettre pour validation"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
