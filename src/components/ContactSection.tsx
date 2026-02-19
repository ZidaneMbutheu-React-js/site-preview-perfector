import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Send, MapPin, Globe } from "lucide-react";

const socials = [
  {
    icon: Globe,
    label: "Behance — zidanembutheu",
    href: "https://www.behance.net/zidanembutheu",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: Mail,
    label: "contact@mbutheudesign.com",
    href: "mailto:contact@mbutheudesign.com",
  },
];

const whyMe = [
  { emoji: "🤝", title: "Approche collaborative", desc: "Je travaille en étroite collaboration avec vous tout au long du projet." },
  { emoji: "🔍", title: "Attention aux détails", desc: "Chaque pixel compte. Je soigne chaque aspect de vos créations." },
  { emoji: "✨", title: "Designs uniques", desc: "Des créations sur mesure, jamais de templates génériques." },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-surface" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Donnons vie à votre{" "}
            <span className="gradient-text">Vision</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Travaillons ensemble pour créer une présence en ligne époustouflante qui vous
            ressemble vraiment.
          </p>
        </motion.div>

        {/* Why choose me */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {whyMe.map(({ emoji, title, desc }) => (
            <div key={title} className="card-glass rounded-xl p-5 text-center hover:border-gold/30 transition-all duration-300">
              <span className="text-3xl mb-3 block">{emoji}</span>
              <h4 className="font-display font-semibold text-foreground mb-2">{title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="card-glass rounded-2xl p-8 h-full">
              <h3 className="font-display text-2xl font-bold mb-4">
                Discutons de votre projet
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Que ce soit pour créer votre site web, développer votre identité visuelle ou
                concevoir une interface utilisateur, je suis là pour transformer votre vision
                en une réalité numérique exceptionnelle.
              </p>

              <div className="flex items-center gap-3 mb-8 text-muted-foreground">
                <MapPin size={16} className="text-gold shrink-0" />
                <span className="text-sm">Disponible partout dans le monde</span>
              </div>

              <div className="space-y-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-raised transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Prénom</label>
                  <input
                    type="text"
                    required
                    placeholder="Jean"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Nom</label>
                  <input
                    type="text"
                    required
                    placeholder="Dupont"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="jean@exemple.fr"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Type de projet</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors"
                >
                  <option value="" className="bg-surface">Sélectionnez un service</option>
                  <option value="web" className="bg-surface">Conception de site web</option>
                  <option value="graphic" className="bg-surface">Design graphique</option>
                  <option value="uiux" className="bg-surface">UI/UX Design</option>
                  <option value="branding" className="bg-surface">Identité de marque</option>
                  <option value="other" className="bg-surface">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Votre message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Décrivez votre vision, vos besoins, votre budget..."
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-gold/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold text-primary-foreground font-semibold font-display flex items-center justify-center gap-2 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)] transition-all duration-300 hover:scale-[1.02]"
              >
                {sent ? "Message envoyé ! ✓" : (
                  <>
                    <Send size={16} />
                    Démarrons votre projet
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
