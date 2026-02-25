import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Tag, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useArticle } from "@/hooks/useArticle";
import LikeButton from "@/components/blog/LikeButton";
import CommentSection from "@/components/blog/CommentSection";

function ArticleDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="space-y-6"
      >
        <div className="h-4 w-48 rounded bg-gold/20" />
        <div className="h-8 w-24 rounded-full bg-gold/20" />
        <div className="h-12 w-3/4 rounded bg-gold/20" />
        <div className="h-4 w-40 rounded bg-gold/20" />
        <div className="aspect-video rounded-2xl bg-gold/20" />
        <div className="space-y-3 pt-4">
          <div className="h-4 w-full rounded bg-gold/20" />
          <div className="h-4 w-5/6 rounded bg-gold/20" />
          <div className="h-4 w-full rounded bg-gold/20" />
          <div className="h-4 w-2/3 rounded bg-gold/20" />
        </div>
      </motion.div>
    </div>
  );
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!loading && error) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {article && (
        <Helmet>
          <title>{article.meta_title || article.title}</title>
          <meta name="description" content={article.meta_description || article.excerpt || ''} />
          <link rel="canonical" href={`https://mbutheudesign.com/blog/${article.slug}`} />
          <meta property="og:title" content={article.meta_title || article.title} />
          <meta property="og:description" content={article.meta_description || article.excerpt || ''} />
          {article.cover_image_url && <meta property="og:image" content={article.cover_image_url} />}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://mbutheudesign.com/blog/${article.slug}`} />
          {article.category && <meta property="article:section" content={article.category} />}
        </Helmet>
      )}
      <Navbar />

      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: article.title,
              description: article.meta_description || article.excerpt,
              image: article.cover_image_url,
              datePublished: article.published_at,
              mainEntityOfPage: `https://mbutheudesign.com/blog/${article.slug}`,
              author: { "@type": "Person", name: "MBUTHEU DESIGN" },
              publisher: { "@type": "Organization", name: "MBUTHEU DESIGN" },
              keywords: article.tags?.join(", "),
            }),
          }}
        />
      )}

      <main className="pt-24 pb-16 px-6">
        {loading && <ArticleDetailSkeleton />}

        {!loading && article && (
          <article className="max-w-3xl mx-auto">
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
              aria-label="Fil d'Ariane"
            >
              <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={14} />
              <Link to="/blog" className="hover:text-gold transition-colors">Blog</Link>
              <ChevronRight size={14} />
              <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
            </motion.nav>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {article.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-medium mb-4">
                  <Tag size={12} />
                  {article.category}
                </span>
              )}

              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                {article.title}
              </h1>

              {article.published_at && (
                <div className="flex items-center gap-6 text-muted-foreground text-sm mb-8">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              )}
            </motion.div>

            {article.cover_image_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden mb-10 aspect-video"
              >
                <img src={article.cover_image_url} alt={article.cover_image_alt || article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </motion.div>
            )}

            {article.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="prose prose-invert max-w-none text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}

            {/* Like button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 mt-10 pt-8 border-t border-border"
            >
              <LikeButton articleSlug={article.slug} />
            </motion.div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">#{tag}</span>
                ))}
              </motion.div>
            )}

            {/* Comments */}
            <CommentSection articleSlug={article.slug} />

            <div className="text-center mt-12">
              <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300">
                <ArrowLeft size={14} />Tous les articles
              </Link>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}
