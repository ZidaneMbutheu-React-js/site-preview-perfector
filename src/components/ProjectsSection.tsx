import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ExternalLink, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { behanceProjects, categories, type ProjectCategory } from "@/data/behanceProjects";

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Tous");

  const filtered = useMemo(() => {
    if (activeCategory === "Tous") return behanceProjects.slice(0, 6);
    return behanceProjects.filter((p) => p.category === activeCategory).slice(0, 6);
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Mes <span className="gradient-text">Réalisations</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Une sélection de projets réels issus de mon portfolio Behance.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
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
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-glass rounded-2xl border border-border overflow-hidden group hover:border-gold/40 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.1)] cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm text-gold text-xs font-medium">
                  {project.category}
                </span>
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink size={14} className="text-gold" />
                </span>
              </div>

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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-primary-foreground font-semibold font-display hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)] transition-all duration-300"
          >
            Voir tous les projets
          </Link>
          <a
            href="https://www.behance.net/zidanembutheu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold/50 text-gold font-semibold font-display hover:bg-gold hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)]"
          >
            <ExternalLink size={16} />
            Portfolio Behance
          </a>
        </motion.div>
      </div>
    </section>
  );
}
