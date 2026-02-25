import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowLeft, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useArticles } from "@/hooks/useArticles";

function ArticleSkeleton() {
  return (
    <motion.div
      className="rounded-2xl border border-border overflow-hidden"
      style={{ background: 'hsl(220 18% 8%)' }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <div className="h-48 bg-gold/20" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 rounded bg-gold/20" />
        <div className="h-5 w-3/4 rounded bg-gold/20" />
        <div className="h-3 w-full rounded bg-gold/20" />
        <div className="h-3 w-2/3 rounded bg-gold/20" />
      </div>
    </motion.div>
  );
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Blog() {
  const { articles, loading, error } = useArticles();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog Design & Web — Conseils UI/UX | MBUTHEU DESIGN</title>
        <meta name="description" content="Conseils, tendances et tutoriels sur le web design, l'UI/UX, Figma, Webflow et l'identité visuelle. Ressources gratuites pour designers et entrepreneurs." />
        <link rel="canonical" href="https://mbutheudesign.com/blog" />
        <meta property="og:title" content="Blog Design & Web — Conseils UI/UX | MBUTHEU DESIGN" />
        <meta property="og:description" content="Conseils, tendances et tutoriels sur le web design, l'UI/UX, Figma, Webflow et l'identité visuelle. Ressources gratuites pour designers et entrepreneurs." />
        <meta property="og:url" content="https://mbutheudesign.com/blog" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8"
            >
              <ArrowLeft size={14} />
              Retour au portfolio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Blog</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Articles & <span className="gradient-text">Ressources</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Conseils, tendances et retours d'expérience sur le design web, UI/UX et le graphisme.
            </p>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => <ArticleSkeleton key={i} />)}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-foreground text-lg">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Aucun article publié pour le moment.</p>
            </div>
          )}

          {/* Articles */}
          {!loading && !error && articles.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-glass rounded-2xl border border-border overflow-hidden group hover:border-gold/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link to={`/blog/${article.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      {article.cover_image_url ? (
                        <img
                          src={article.cover_image_url}
                          alt={article.cover_image_alt || article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      {article.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-medium flex items-center gap-1">
                          <Tag size={10} />
                          {article.category}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                        {article.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(article.published_at)}
                          </span>
                        )}
                      </div>

                      <h2 className="font-display font-bold text-foreground text-lg leading-tight mb-2 group-hover:text-gold transition-colors">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {article.excerpt}
                        </p>
                      )}

                      <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                        Lire l'article
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
