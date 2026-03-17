import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { behanceProjects, categories, type ProjectCategory } from "@/data/behanceProjects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Tous");

  const filtered = useMemo(() => {
    if (activeCategory === "Tous") return behanceProjects;
    return behanceProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { Tous: behanceProjects.length };
    behanceProjects.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portfolio — Réalisations UI/UX & Web Design | MBUTHEU DESIGN</title>
        <meta name="description" content="Découvrez le portfolio de MBUTHEU DESIGN : sites vitrines, bannières publicitaires, posters créatifs et plus encore." />
        <link rel="canonical" href="https://mbutheudesign.com/projets" />
        <meta property="og:title" content="Portfolio — Réalisations UI/UX & Web Design | MBUTHEU DESIGN" />
        <meta property="og:description" content="Découvrez le portfolio de MBUTHEU DESIGN : sites vitrines, bannières publicitaires, posters créatifs et plus encore." />
        <meta property="og:url" content="https://mbutheudesign.com/projets" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm"
            >
              <ArrowLeft size={14} />
              Retour à l'accueil
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Portfolio Behance</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Mes <span className="gradient-text">Réalisations</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explorez l'ensemble de mes projets classés par catégorie. Chaque projet redirige vers sa page Behance.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-gold text-primary-foreground border-gold shadow-[0_0_20px_hsl(38_90%_55%/0.3)]"
                    : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold card-glass"
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat === "Tous" && <Filter size={14} />}
                  {cat}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat ? "bg-primary-foreground/20" : "bg-muted"
                  }`}>
                    {counts[cat] || 0}
                  </span>
                </span>
              </button>
            ))}
          </motion.div>

          {/* Category Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="font-display text-2xl font-bold text-foreground">
                {activeCategory === "Tous" ? "Tous les projets" : activeCategory}
                <span className="text-muted-foreground text-lg font-normal ml-3">
                  ({filtered.length} projet{filtered.length > 1 ? "s" : ""})
                </span>
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card-glass rounded-2xl border border-border overflow-hidden group hover:border-gold/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(38_90%_55%/0.1)] cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm text-gold text-xs font-medium">
                      {project.category}
                    </span>

                    {/* External link icon */}
                    <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={14} className="text-gold" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display font-bold text-foreground text-lg leading-tight mb-3 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA Behance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <a
              href="https://www.behance.net/zidanembutheu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold/50 text-gold font-semibold font-display hover:bg-gold hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)]"
            >
              <ExternalLink size={16} />
              Voir tout mon portfolio sur Behance
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
