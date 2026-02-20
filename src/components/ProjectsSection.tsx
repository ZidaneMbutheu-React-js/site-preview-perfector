import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

import projectArchitecture from "@/assets/project-architecture.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectFarm from "@/assets/project-farm.jpg";
import projectAds from "@/assets/project-ads.jpg";
import projectPoster from "@/assets/project-poster.jpg";
import projectHero from "@/assets/project-hero.jpg";

const projects = [
  {
    title: "Architecture Website — UI/UX Design",
    description: "Design complet d'un site web pour un cabinet d'architecture durable, avec une navigation immersive et une mise en valeur des projets de construction écologique.",
    tags: ["UI/UX", "Web Design", "Architecture", "Responsive"],
    image: projectArchitecture,
    link: "https://www.behance.net/gallery/244452161/Architecture-Website-UIUX-Dedsign",
    border: "border-green-500/20",
  },
  {
    title: "Modern E-commerce — UI/UX Design",
    description: "Conception d'une plateforme e-commerce moderne avec parcours d'achat optimisé, fiches produits détaillées et interface de panier intuitive.",
    tags: ["E-commerce", "UI/UX", "Figma", "Responsive"],
    image: projectEcommerce,
    link: "https://www.behance.net/gallery/244452031/Modern-E-commerce-UIUX-Design",
    border: "border-amber-500/20",
  },
  {
    title: "Farm Website — UI/UX Design",
    description: "Site web pour une ferme bio avec une identité visuelle naturelle, catalogue de produits frais et système de commande en ligne simplifié.",
    tags: ["UI/UX", "Web Design", "Agriculture", "Branding"],
    image: projectFarm,
    link: "https://www.behance.net/gallery/243689309/Farm-Website-UIUX-Design",
    border: "border-emerald-500/20",
  },
  {
    title: "Ads Banners — Design Publicitaire",
    description: "Création d'une série de bannières publicitaires percutantes pour les réseaux sociaux, avec des visuels dynamiques et des appels à l'action efficaces.",
    tags: ["Graphic Design", "Social Media", "Advertising", "Illustrator"],
    image: projectAds,
    link: "https://www.behance.net/gallery/243246301/Ads-banner",
    border: "border-violet-500/20",
  },
  {
    title: "Coming Soon — Poster Design",
    description: "Conception d'une affiche événementielle avec typographie bold, compteur de lancement et identité visuelle mémorable pour générer l'anticipation.",
    tags: ["Poster", "Typographie", "Graphic Design", "Événementiel"],
    image: projectPoster,
    link: "https://www.behance.net/gallery/243640519/Coming-soon-poster",
    border: "border-rose-500/20",
  },
  {
    title: "Hero Section — Page Design",
    description: "Design de sections hero modernes avec gradients, animations subtiles et hiérarchie visuelle claire pour maximiser l'engagement utilisateur.",
    tags: ["Web Design", "UI/UX", "Landing Page", "Gradient"],
    image: projectHero,
    link: "https://www.behance.net/gallery/242751655/Hero-Section-Page",
    border: "border-blue-500/20",
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
            Une sélection de projets réels issus de mon portfolio Behance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group card-glass rounded-2xl border ${project.border} hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center hover:bg-gold/20 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ExternalLink size={14} className="text-muted-foreground" />
                </a>
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold text-foreground text-lg leading-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
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
