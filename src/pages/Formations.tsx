import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Users, Play, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const formations = [
  {
    title: "Maîtriser Figma de A à Z",
    public: "Débutants et intermédiaires",
    duration: "8h",
    format: "Vidéo + exercices pratiques",
    description:
      "Apprenez à concevoir des interfaces professionnelles, créer des composants réutilisables et collaborer efficacement avec Figma.",
  },
  {
    title: "Créer son site WordPress",
    public: "Entrepreneurs et freelances",
    duration: "6h",
    format: "Ateliers live",
    description:
      "Lancez votre site vitrine ou portfolio de A à Z, sans coder. Thèmes, plugins essentiels et bonnes pratiques SEO inclus.",
  },
  {
    title: "Design System & Composants",
    public: "Designers avancés",
    duration: "4h",
    format: "Masterclass",
    description:
      "Structurez vos projets avec un design system solide : tokens, composants, documentation et collaboration d'équipe.",
  },
];

const Formations = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const handleWaitlist = () => {
    navigate("/contact?utm_source=formations#contact");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Formations Design — UI/UX, Figma & WordPress | MBUTHEU DESIGN</title>
        <meta
          name="description"
          content="Formez-vous au design avec MBUTHEU DESIGN : formations UI/UX, maîtrise de Figma, création de sites WordPress et identité visuelle. Pour débutants et professionnels."
        />
        <link rel="canonical" href="https://mbutheudesign.com/formations" />
        <meta property="og:title" content="Formations Design — UI/UX, Figma & WordPress | MBUTHEU DESIGN" />
        <meta
          property="og:description"
          content="Formez-vous au design avec MBUTHEU DESIGN : formations UI/UX, maîtrise de Figma, création de sites WordPress et identité visuelle."
        />
        <meta property="og:url" content="https://mbutheudesign.com/formations" />
      </Helmet>
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="px-6 py-24 hero-bg grid-dots">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gold text-sm font-medium tracking-widest uppercase mb-4"
            >
              Formations
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
            >
              Formez-vous au Design{" "}
              <span className="gradient-text">avec Zidane Mbutheu</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Des formations pratiques pour maîtriser les outils et méthodes du design professionnel.
            </motion.p>
          </div>
        </section>

        {/* Formations */}
        <section ref={ref} className="px-6 py-24 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {formations.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="card-glass rounded-2xl p-8 flex flex-col justify-between hover:border-gold/30 transition-all duration-300"
                >
                  <div>
                    <Badge className="bg-gold/15 text-gold border-gold/30 mb-5">
                      Bientôt disponible
                    </Badge>
                    <h2 className="font-display text-xl font-bold text-foreground mb-3">
                      {f.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6">{f.description}</p>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Users size={15} className="text-gold shrink-0" />
                        <span>{f.public}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Clock size={15} className="text-gold shrink-0" />
                        <span>{f.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Play size={15} className="text-gold shrink-0" />
                        <span>{f.format}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleWaitlist}
                    className="mt-8 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300"
                  >
                    Rejoindre la liste d'attente
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Formations;
