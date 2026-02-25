import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";

function ProjectSkeleton() {
  return (
    <motion.div
      className="rounded-2xl border border-border overflow-hidden"
      style={{ background: 'hsl(220 18% 8%)' }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <div className="h-56 bg-gold/20" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 rounded bg-gold/20" />
        <div className="h-5 w-3/4 rounded bg-gold/20" />
        <div className="h-3 w-full rounded bg-gold/20" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-16 rounded-full bg-gold/20" />
          <div className="h-6 w-16 rounded-full bg-gold/20" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects, loading, error } = useProjects();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portfolio — Réalisations UI/UX & Web Design | MBUTHEU DESIGN</title>
        <meta name="description" content="Découvrez le portfolio de MBUTHEU DESIGN : sites vitrines, applications mobiles, identités de marque et dashboards conçus avec Figma et Webflow." />
        <link rel="canonical" href="https://mbutheudesign.com/projets" />
        <meta property="og:title" content="Portfolio — Réalisations UI/UX & Web Design | MBUTHEU DESIGN" />
        <meta property="og:description" content="Découvrez le portfolio de MBUTHEU DESIGN : sites vitrines, applications mobiles, identités de marque et dashboards conçus avec Figma et Webflow." />
        <meta property="og:url" content="https://mbutheudesign.com/projets" />
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
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Portfolio</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Nos <span className="gradient-text">Réalisations</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez nos projets en UI/UX design, identité visuelle et développement web.
            </p>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((i) => <ProjectSkeleton key={i} />)}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-foreground text-lg">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Portfolio en cours de construction.</p>
            </div>
          )}

          {/* Projects */}
          {!loading && !error && projects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-glass rounded-2xl border border-border overflow-hidden group hover:border-gold/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link to={`/projets/${project.slug}`}>
                    <div className="relative h-56 overflow-hidden">
                      {project.images && project.images[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      {project.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-medium">
                          {project.category}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h2 className="font-display font-bold text-foreground text-xl leading-tight mb-2 group-hover:text-gold transition-colors">
                        {project.title}
                      </h2>
                      {project.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>
                      )}
                      {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span key={tool} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                  {project.external_url && (
                    <div className="px-5 pb-5">
                      <a
                        href={project.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gold text-sm hover:underline"
                      >
                        Voir le projet <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
