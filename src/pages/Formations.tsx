import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Users, Play, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

import formationFigma from "@/assets/formation-figma.jpg";
import formationWordpress from "@/assets/formation-wordpress.jpg";
import formationDesignSystem from "@/assets/formation-design-system.jpg";
import formationBrandIdentity from "@/assets/formation-brand-identity.jpg";
import formationCharteGraphique from "@/assets/formation-charte-graphique.jpg";
import formationLogoDesign from "@/assets/formation-logo-design.jpg";
import formationPackaging from "@/assets/formation-packaging.jpg";

const formations = [
  {
    title: "Maîtriser Figma de A à Z",
    public: "Débutants et intermédiaires",
    duration: "8h",
    format: "Vidéo + exercices pratiques",
    description:
      "Apprenez à concevoir des interfaces professionnelles, créer des composants réutilisables et collaborer efficacement avec Figma.",
    image: formationFigma,
    category: "UI/UX",
  },
  {
    title: "Créer son site WordPress",
    public: "Entrepreneurs et freelances",
    duration: "6h",
    format: "Ateliers live",
    description:
      "Lancez votre site vitrine ou portfolio de A à Z, sans coder. Thèmes, plugins essentiels et bonnes pratiques SEO inclus.",
    image: formationWordpress,
    category: "Web",
  },
  {
    title: "Design System & Composants",
    public: "Designers avancés",
    duration: "4h",
    format: "Masterclass",
    description:
      "Structurez vos projets avec un design system solide : tokens, composants, documentation et collaboration d'équipe.",
    image: formationDesignSystem,
    category: "UI/UX",
  },
  {
    title: "Identité de Marque",
    public: "Entrepreneurs et freelances",
    duration: "5h",
    format: "Ateliers live",
    description:
      "Construisez une identité visuelle forte et cohérente pour votre marque : positionnement, univers graphique et déclinaisons.",
    image: formationBrandIdentity,
    category: "Branding",
  },
  {
    title: "Charte Graphique",
    public: "Entrepreneurs et freelances",
    duration: "4h",
    format: "Ateliers live",
    description:
      "Créez un document de référence complet : palette de couleurs, typographies, règles d'utilisation du logo et supports visuels.",
    image: formationCharteGraphique,
    category: "Branding",
  },
  {
    title: "Logo Design",
    public: "Entrepreneurs et freelances",
    duration: "5h",
    format: "Ateliers live",
    description:
      "Concevez un logo mémorable et professionnel : de la recherche créative aux fichiers finaux prêts pour tous supports.",
    image: formationLogoDesign,
    category: "Branding",
  },
  {
    title: "Packaging Design",
    public: "Entrepreneurs et freelances",
    duration: "6h",
    format: "Ateliers live",
    description:
      "Maîtrisez la création de packaging impactant : contraintes techniques, storytelling visuel et mockups réalistes.",
    image: formationPackaging,
    category: "Print",
  },
];

const FormationCard = ({
  formation,
  index,
  inView,
}: {
  formation: (typeof formations)[0];
  index: number;
  inView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleWaitlist = () => {
    navigate("/contact?utm_source=formations#contact");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleWaitlist}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={formation.image}
          alt={formation.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.08 : 1,
            filter: isHovered ? "brightness(0.4)" : "brightness(0.6)",
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Category badge - top */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gold/15 text-gold border-gold/30 backdrop-blur-sm text-xs tracking-wider uppercase">
            {formation.category}
          </Badge>
        </div>

        {/* Coming soon badge - top right */}
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Badge className="bg-foreground/10 text-foreground/70 border-foreground/20 backdrop-blur-sm text-xs">
              Bientôt disponible
            </Badge>
          </motion.div>
        </div>

        {/* Content overlay - bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <motion.h2
            className="font-display text-xl md:text-2xl font-bold text-foreground mb-2"
            animate={{ y: isHovered ? -8 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {formation.title}
          </motion.h2>

          {/* Description - reveals on hover */}
          <motion.p
            className="text-muted-foreground text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {formation.description}
          </motion.p>

          {/* Meta info - reveals on hover */}
          <motion.div
            className="flex flex-wrap gap-4 mt-4 text-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="flex items-center gap-1.5 text-foreground/70">
              <Users size={13} className="text-gold" />
              {formation.public}
            </span>
            <span className="flex items-center gap-1.5 text-foreground/70">
              <Clock size={13} className="text-gold" />
              {formation.duration}
            </span>
            <span className="flex items-center gap-1.5 text-foreground/70">
              <Play size={13} className="text-gold" />
              {formation.format}
            </span>
          </motion.div>

          {/* CTA - reveals on hover */}
          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group/cta">
              Rejoindre la liste d'attente
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
              />
            </span>
          </motion.div>
        </div>

        {/* Border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-gold/0 pointer-events-none"
          animate={{
            borderColor: isHovered
              ? "hsl(var(--gold) / 0.3)"
              : "hsl(var(--gold) / 0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

const Formations = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Formations Design — UI/UX, Figma, Branding & WordPress | MBUTHEU DESIGN</title>
        <meta
          name="description"
          content="Formez-vous au design avec MBUTHEU DESIGN : formations UI/UX, maîtrise de Figma, identité de marque, logo design, packaging et création de sites WordPress. Pour débutants et professionnels."
        />
        <link rel="canonical" href="https://mbutheudesign.com/formations" />
        <meta property="og:title" content="Formations Design — UI/UX, Figma, Branding & WordPress | MBUTHEU DESIGN" />
        <meta
          property="og:description"
          content="Formez-vous au design avec MBUTHEU DESIGN : formations UI/UX, maîtrise de Figma, identité de marque, logo design, packaging et création de sites WordPress."
        />
        <meta property="og:url" content="https://mbutheudesign.com/formations" />
      </Helmet>
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="px-6 py-24 md:py-32 hero-bg grid-dots">
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
              Des formations pratiques pour maîtriser les outils et méthodes du design professionnel — du branding au digital.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex items-center justify-center gap-8 md:gap-16"
            >
              {[
                { value: "7", label: "Formations" },
                { value: "38h+", label: "De contenu" },
                { value: "100%", label: "Pratique" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl md:text-3xl font-bold text-gold">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Formations Grid */}
        <section ref={ref} className="px-6 py-24 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {formations.map((f, i) => (
                <FormationCard
                  key={f.title}
                  formation={f}
                  index={i}
                  inView={inView}
                />
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
