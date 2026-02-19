import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Layout, Users } from "lucide-react";

const stats = [
  { value: "100%", label: "Sur mesure" },
  { value: "∞", label: "Créativité" },
  { value: "1:1", label: "Collaboration" },
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
            Ma <span className="gradient-text">Vision</span>
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
              Je me spécialise dans la création d'expériences numériques sur mesure qui aident
              les marques à se démarquer et à se connecter avec leur public. En mettant l'accent
              sur la conception de sites web personnalisés, je travaille en étroite collaboration
              avec mes clients pour comprendre leur vision unique.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Mon expertise en design graphique et UI/UX me permet de créer non seulement des
              designs visuellement captivants mais aussi des interfaces intuitives et conviviales
              — et de la traduire en une présence en ligne époustouflante.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Figma", "Adobe XD", "Illustrator", "Photoshop", "Webflow", "WordPress"].map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium"
                >
                  {tool}
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
              {
                icon: Layout,
                title: "Conception Web Personnalisée",
                desc: "Des sites web uniques pensés pour votre marque, votre public et vos objectifs.",
              },
              {
                icon: Palette,
                title: "Design Graphique",
                desc: "Identités visuelles fortes, supports de communication et assets numériques qui marquent les esprits.",
              },
              {
                icon: Users,
                title: "Expertise UI/UX",
                desc: "Des interfaces intuitives et conviviales qui convertissent vos visiteurs en clients fidèles.",
              },
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
