import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Layers, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Découverte",
    description: "Appel de 30 min pour comprendre votre vision, vos objectifs et votre cible.",
    Icon: MessageCircle,
  },
  {
    number: "02",
    title: "Conception",
    description: "Création des maquettes Figma, itérations jusqu'à validation complète de votre part.",
    Icon: Layers,
  },
  {
    number: "03",
    title: "Livraison",
    description: "Intégration, tests, mise en ligne et transmission de tous les fichiers sources.",
    Icon: CheckCircle,
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Processus</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Comment je <span className="gradient-text">travaille</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Un processus simple et transparent, du premier échange à la livraison finale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-[72px] left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-glass rounded-2xl border border-border p-8 text-center relative group hover:border-gold/30 transition-colors duration-300"
            >
              {/* Number */}
              <span className="text-gold/20 font-display text-6xl font-bold absolute top-4 right-5 select-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <step.Icon size={24} className="text-gold" />
              </div>

              <h3 className="font-display font-bold text-foreground text-xl mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
