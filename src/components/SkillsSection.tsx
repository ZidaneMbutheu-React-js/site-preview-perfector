import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Intelligence Artificielle",
    skills: [
      { name: "LangChain / LangGraph", level: 90 },
      { name: "OpenAI / GPT-4", level: 92 },
      { name: "Prompt Engineering", level: 88 },
      { name: "RAG & Vector DBs", level: 85 },
    ],
  },
  {
    category: "Développement Web",
    skills: [
      { name: "React / TypeScript", level: 95 },
      { name: "Node.js / Python", level: 88 },
      { name: "TailwindCSS", level: 93 },
      { name: "API REST & GraphQL", level: 87 },
    ],
  },
  {
    category: "Outils & DevOps",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 78 },
      { name: "Supabase / Firebase", level: 85 },
      { name: "Vercel / Railway", level: 88 },
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 bg-surface" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Expertise</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Mes <span className="gradient-text">Compétences</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className="card-glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-300"
            >
              <h3 className="font-display font-bold text-foreground mb-6 pb-4 border-b border-border">
                {group.category}
              </h3>
              <div className="space-y-5">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground/80 font-medium">{skill.name}</span>
                      <span className="text-xs text-gold font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: gi * 0.15 + si * 0.1 + 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
