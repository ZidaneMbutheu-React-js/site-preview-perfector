import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Code2, Zap } from "lucide-react";

const stats = [
  { value: "50+", label: "Projets livrés" },
  { value: "3 ans", label: "D'expérience" },
  { value: "100%", label: "Clients satisfaits" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">À propos</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Qui suis-<span className="gradient-text">je</span> ?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Je suis un développeur spécialisé dans la création d'agents IA autonomes et
              d'applications web modernes. Passionné par l'intersection entre intelligence
              artificielle et expérience utilisateur, je transforme des concepts complexes en
              solutions élégantes et intuitives.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Mon approche combine une expertise technique solide avec une sensibilité design,
              permettant de livrer des produits qui non seulement fonctionnent parfaitement, mais
              qui captivent aussi leurs utilisateurs.
            </p>

            <div className="flex flex-wrap gap-3">
              {["React", "TypeScript", "Python", "LangChain", "OpenAI", "Node.js"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { icon: Bot, title: "Agents IA", desc: "Conception d'agents autonomes capables de raisonner, planifier et exécuter des tâches complexes." },
              { icon: Code2, title: "Développement Web", desc: "Applications web modernes, performantes et accessibles avec les dernières technologies." },
              { icon: Zap, title: "Automatisation", desc: "Workflows automatisés qui économisent du temps et réduisent les erreurs humaines." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-glass rounded-xl p-5 flex gap-4 group hover:border-gold/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-border"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">{value}</p>
              <p className="text-muted-foreground text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
