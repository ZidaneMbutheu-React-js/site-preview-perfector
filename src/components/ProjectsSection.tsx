import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Agent Recherche IA",
    description: "Agent autonome capable de naviguer sur le web, synthétiser des informations et générer des rapports détaillés en langage naturel.",
    tags: ["LangChain", "GPT-4", "Python", "FastAPI"],
    gradient: "from-amber-500/20 to-orange-600/10",
    border: "border-amber-500/20",
  },
  {
    title: "Dashboard Analytics",
    description: "Tableau de bord temps réel pour visualiser des métriques business complexes avec des graphiques interactifs et alertes intelligentes.",
    tags: ["React", "TypeScript", "Recharts", "Supabase"],
    gradient: "from-blue-500/20 to-cyan-600/10",
    border: "border-blue-500/20",
  },
  {
    title: "Chatbot E-commerce",
    description: "Assistant IA intégré à une boutique en ligne, capable de conseiller les clients, gérer les commandes et personnaliser l'expérience.",
    tags: ["OpenAI", "Node.js", "React", "Stripe"],
    gradient: "from-green-500/20 to-emerald-600/10",
    border: "border-green-500/20",
  },
  {
    title: "Pipeline d'Automatisation",
    description: "Système de traitement de documents automatisé utilisant l'IA pour extraire, classer et router intelligemment les contenus.",
    tags: ["Python", "LangGraph", "Docker", "PostgreSQL"],
    gradient: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-500/20",
  },
  {
    title: "Assistant Code Review",
    description: "Outil IA intégré à GitHub Actions qui analyse automatiquement les pull requests et suggère des améliorations contextualisées.",
    tags: ["GitHub API", "GPT-4", "TypeScript", "Webhooks"],
    gradient: "from-rose-500/20 to-red-600/10",
    border: "border-rose-500/20",
  },
  {
    title: "Plateforme SaaS No-Code",
    description: "Interface drag-and-drop permettant aux non-développeurs de créer leurs propres agents IA sans écrire une seule ligne de code.",
    tags: ["React Flow", "OpenAI", "Supabase", "Tailwind"],
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
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Une sélection de mes réalisations les plus récentes en IA et développement web.
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
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-gold/20 transition-colors">
                      <Github size={14} className="text-muted-foreground" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-gold/20 transition-colors">
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </button>
                  </div>
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
      </div>
    </section>
  );
}
