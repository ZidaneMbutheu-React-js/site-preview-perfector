import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Site Vitrine — Marque de Mode",
    description: "Conception complète d'un site vitrine haut de gamme pour une marque de prêt-à-porter, avec une identité visuelle forte et une expérience utilisateur immersive.",
    tags: ["UI/UX", "Webflow", "Identité visuelle", "Responsive"],
    gradient: "from-amber-500/20 to-orange-600/10",
    border: "border-amber-500/20",
  },
  {
    title: "Identité Visuelle — Startup Tech",
    description: "Création d'une identité de marque complète (logo, charte graphique, templates) pour une startup technologique en phase de lancement.",
    tags: ["Branding", "Illustrator", "Charte graphique", "Logo"],
    gradient: "from-blue-500/20 to-cyan-600/10",
    border: "border-blue-500/20",
  },
  {
    title: "Application Mobile — Fitness",
    description: "Design UI/UX d'une application de suivi fitness avec parcours utilisateur optimisé, composants réutilisables et design system documenté.",
    tags: ["Figma", "Mobile UI", "Design System", "Prototypage"],
    gradient: "from-green-500/20 to-emerald-600/10",
    border: "border-green-500/20",
  },
  {
    title: "E-commerce — Artisanat Local",
    description: "Refonte complète d'une boutique en ligne d'artisanat, avec une expérience d'achat simplifiée et une mise en valeur des produits faits main.",
    tags: ["UI/UX", "WordPress", "WooCommerce", "Responsive"],
    gradient: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-500/20",
  },
  {
    title: "Dashboard — SaaS Analytics",
    description: "Conception d'une interface tableau de bord complexe avec visualisation de données, onboarding guidé et composants interactifs accessibles.",
    tags: ["UI/UX", "Figma", "Data Viz", "Accessibilité"],
    gradient: "from-rose-500/20 to-red-600/10",
    border: "border-rose-500/20",
  },
  {
    title: "Portfolio — Photographe",
    description: "Site portfolio minimaliste et élégant pour mettre en valeur l'œuvre photographique, avec galerie immersive et navigation fluide.",
    tags: ["Web Design", "Webflow", "Galerie", "Animation"],
    gradient: "from-gold/20 to-yellow-600/10",
    border: "border-gold/20",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Mes <span className="gradient-text">Réalisations</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Une sélection de projets qui illustrent mon approche créative et collaborative.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group card-glass rounded-2xl p-6 border ${project.border} hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display font-bold text-foreground text-lg leading-tight">
                    {project.title}
                  </h3>
                  <a
                    href="https://www.behance.net/zidanembutheu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-gold/20 transition-colors opacity-0 group-hover:opacity-100 shrink-0 ml-2"
                  >
                    <ExternalLink size={14} className="text-muted-foreground" />
                  </a>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

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
            </motion.div>
          ))}
        </div>

        {/* Behance CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
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
    </section>
  );
}
