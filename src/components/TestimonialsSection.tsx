import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Arnaud K.",
    role: "Fondateur, TechStart Cameroun",
    content: "Zidane a su traduire notre vision en une identité visuelle unique. Son approche collaborative et son attention aux détails ont fait toute la différence pour le lancement de notre startup.",
    rating: 5,
  },
  {
    name: "Marie-Claire D.",
    role: "Directrice Marketing, Ayma Store",
    content: "Les bannières publicitaires créées par MBUTHEU DESIGN ont considérablement augmenté notre engagement sur les réseaux sociaux. Un travail professionnel et des délais toujours respectés.",
    rating: 5,
  },
  {
    name: "Patrick N.",
    role: "Architecte, GreenBuild Studio",
    content: "Le site web conçu pour notre cabinet d'architecture est exactement ce que nous imaginions. L'expérience utilisateur est fluide et le design met parfaitement en valeur nos projets.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    role: "Gérante, Ferme Bio du Mfoundi",
    content: "Grâce au design de notre site e-commerce, nos ventes en ligne ont triplé. Zidane comprend vraiment les besoins de chaque client et propose des solutions sur mesure.",
    rating: 5,
  },
  {
    name: "Jean-Paul T.",
    role: "CEO, Digital Agency Douala",
    content: "Nous avons collaboré sur plusieurs projets et le résultat est toujours au-delà de nos attentes. Sa maîtrise du UI/UX et du design graphique est impressionnante.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Témoignages</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Ce que disent mes <span className="gradient-text">Clients</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            La satisfaction de mes clients est ma plus grande récompense.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Main testimonial card */}
          <div className="card-glass rounded-2xl border border-border p-8 md:p-12 relative overflow-hidden min-h-[280px] flex flex-col justify-center">
            {/* Quote icon */}
            <Quote className="absolute top-6 left-6 text-gold/20" size={48} />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Content with animation */}
              <motion.p
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-foreground text-lg md:text-xl leading-relaxed text-center italic mb-8"
              >
                "{testimonials[current].content}"
              </motion.p>

              <motion.div
                key={`author-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center"
              >
                <p className="font-display font-bold text-foreground text-lg">
                  {testimonials[current].name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonials[current].role}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-surface-raised border border-border flex items-center justify-center hover:bg-gold/20 hover:border-gold/50 transition-all"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-surface-raised border border-border flex items-center justify-center hover:bg-gold/20 hover:border-gold/50 transition-all"
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-gold w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Aller au témoignage ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
