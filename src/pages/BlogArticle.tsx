import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, ChevronRight, ExternalLink } from "lucide-react";
import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";
import LikeButton from "@/components/blog/LikeButton";
import CommentSection from "@/components/blog/CommentSection";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();

  const currentIndex = useMemo(() => articles.findIndex((a) => a.id === slug), [slug]);
  const article = articles[currentIndex];
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-6 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Article introuvable</h1>
          <Link to="/blog" className="text-gold hover:underline">Retour au blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const renderContent = (block: string) => {
    if (block.startsWith("## ")) {
      return (
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">
          {block.replace("## ", "")}
        </h2>
      );
    }

    // Parse inline links: [text](url) and external [text](url){external}
    const parts = block.split(/(\[[^\]]+\]\([^)]+\)(?:\{external\})?)/g);
    const rendered = parts.map((part, idx) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)(\{external\})?$/);
      if (linkMatch) {
        const [, text, url, isExternal] = linkMatch;
        if (isExternal || url.startsWith("http")) {
          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline inline-flex items-center gap-1"
            >
              {text}
              <ExternalLink size={12} />
            </a>
          );
        }
        return (
          <Link key={idx} to={url} className="text-gold hover:underline">
            {text}
          </Link>
        );
      }
      return <span key={idx}>{part}</span>;
    });

    return (
      <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
        {rendered}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={`https://mbutheudesign.com/blog/${article.id}`} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://mbutheudesign.com/blog/${article.id}`} />
        <meta property="article:section" content={article.category} />
      </Helmet>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.metaDescription,
            image: article.image,
            datePublished: article.date,
            dateModified: article.date,
            mainEntityOfPage: `https://mbutheudesign.com/blog/${article.id}`,
            author: { "@type": "Person", name: "MBUTHEU DESIGN" },
            publisher: { "@type": "Organization", name: "MBUTHEU DESIGN" },
            keywords: article.tags.join(", "),
          }),
        }}
      />

      <main className="pt-24 pb-16 px-6">
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-medium mb-4">
              <Tag size={12} />
              {article.category}
            </span>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground text-sm mb-8">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{article.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{article.readTime} de lecture</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden mb-10 aspect-video"
          >
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {article.content.map((block, i) => (
              <div key={i}>{renderContent(block)}</div>
            ))}
          </motion.div>

          {/* Like button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mt-10 pt-8 border-t border-border"
          >
            <LikeButton articleSlug={article.id} />
          </motion.div>

          {/* Tags */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">#{tag}</span>
            ))}
          </motion.div>

          {/* Prev/Next navigation */}
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t border-border">
            {prevArticle ? (
              <Link to={`/blog/${prevArticle.id}`} className="group card-glass rounded-xl border border-border p-5 hover:border-gold/30 transition-all">
                <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2"><ArrowLeft size={12} />Article précédent</span>
                <span className="font-display font-semibold text-foreground group-hover:text-gold transition-colors text-sm leading-snug">{prevArticle.title}</span>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link to={`/blog/${nextArticle.id}`} className="group card-glass rounded-xl border border-border p-5 hover:border-gold/30 transition-all text-right">
                <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-2">Article suivant<ArrowRight size={12} /></span>
                <span className="font-display font-semibold text-foreground group-hover:text-gold transition-colors text-sm leading-snug">{nextArticle.title}</span>
              </Link>
            ) : <div />}
          </nav>

          {/* Related articles */}
          <RelatedArticles currentSlug={article.id} relatedSlugs={article.relatedSlugs} />

          {/* Comments */}
          <CommentSection articleSlug={article.id} />

          <div className="text-center mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300">
              <ArrowLeft size={14} />Tous les articles
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
