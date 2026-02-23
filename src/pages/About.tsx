import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Palette, Layout, Users, ArrowRight, Briefcase, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tools = [
  { name: "Figma", category: "UI/UX Design" },
  { name: "Adobe XD", category: "UI/UX Design" },
  { name: "Adobe Illustrator", category: "Design Graphique" },
  { name: "Adobe Photoshop", category: "Design Graphique" },
  { name: "WordPress", category: "Web Design" },
  { name: "Webflow", category: "Web Design" },
  { name: "Adobe Premiere Pro", category: "Vidéo" },
  { name: "Adobe After Effects", category: "Motion" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const About = () => {
  const introRef = useRef(null);
  const philoRef = useRef(null);
  const toolsRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  const introInView = useInView(introRef, { once: true, margin: "-80px" });
  const philoInView = useInView(philoRef, { once: true, margin: "-80px" });
  const toolsInView = useInView(toolsRef, { once: true, margin: "-80px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>À propos — MBUTHEU DESIGN, Designer UI/UX Freelance</title>
        <meta
          name="description"
          content="Découvrez la vision et l'approche de MBUTHEU DESIGN : création d'expériences numériques sur mesure, design graphique et UI/UX pour marques ambitieuses."
        />
        <link rel="canonical" href="https://mbutheudesign.com/a-propos" />
        <meta property="og:title" content="À propos — MBUTHEU DESIGN, Designer UI/UX Freelance" />
        <meta
          property="og:description"
          content="Découvrez la vision et l'approche de MBUTHEU DESIGN : création d'expériences numériques sur mesure, design graphique et UI/UX pour marques ambitieuses."
        />
        <meta property="og:url" content="https://mbutheudesign.com/a-propos" />
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* ── H1 + Accroche personnelle ── */}
        <section className="px-6 py-20 md:py-28" ref={introRef}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate={introInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
              className="mb-4"
            >
              <p className="text-gold text-sm font-medium tracking-widest uppercase mb-6">
                À propos
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Designer{" "}
                <span className="gradient-text">UI/UX</span>,{" "}
                Web Design &amp; Graphisme
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={introInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={1}
            >
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mt-8 max-w-3xl">
                Je suis designer UI/UX et graphiste freelance, passionné par la création
                d'expériences numériques qui connectent les marques à leur public. Depuis
                plusieurs années, j'accompagne entrepreneurs, startups et PME en Afrique
                et à l'international dans la conception de sites web sur mesure, d'identités
                visuelles fortes et d'interfaces intuitives avec Figma, WordPress et Webflow.
                Chaque projet est pour moi une opportunité de raconter une histoire visuelle
                unique et mémorable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Section 2 — Ma philosophie ── */}
        <section className="px-6 py-20 bg-surface" ref={philoRef}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate={philoInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
                Ma <span className="gradient-text">Philosophie</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={philoInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={1}
              className="space-y-6"
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                Je crois qu'un bon design va au-delà de l'esthétique — il résout des
                problèmes et crée de la valeur. Mon approche est à la fois stratégique,
                artistique et centrée sur l'utilisateur. Je ne me contente pas de livrer
                des maquettes : je m'immerge dans l'univers de chaque client pour comprendre
                ses objectifs, son public cible et son identité.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Mon processus collaboratif se déroule en quatre étapes clés :
                <strong className="text-foreground"> analyse des besoins</strong>,
                <strong className="text-foreground"> recherche et conceptualisation</strong>,
                <strong className="text-foreground"> design et prototypage</strong>, puis
                <strong className="text-foreground"> optimisation et livraison</strong>.
                Cette méthode garantit des concepts visuels et interactifs parfaitement
                alignés avec la vision de chaque projet, tout en respectant les standards
                de hiérarchie visuelle et d'ergonomie.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Section 3 — Outils & Compétences ── */}
        <section className="px-6 py-20" ref={toolsRef}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              animate={toolsInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
              className="mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Outils &amp; <span className="gradient-text">Compétences</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Les outils que je maîtrise pour donner vie à vos projets de design graphique,
                conception UI/UX et web design.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial="hidden"
                  animate={toolsInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className="card-glass rounded-xl p-5 hover:border-gold/40 transition-all duration-300 group"
                >
                  <p className="font-display font-semibold text-foreground group-hover:text-gold transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">{tool.category}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4 — Mes Services ── */}
        <section className="px-6 py-20 bg-surface" ref={servicesRef}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
              className="mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Mes <span className="gradient-text">Services</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Des solutions sur mesure pour renforcer votre présence digitale.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Layout,
                  title: "Conception Web & WordPress",
                  desc: "Sites vitrines, landing pages et plateformes web conçus sur mesure avec WordPress et Webflow, optimisés pour la conversion et le référencement.",
                },
                {
                  icon: Palette,
                  title: "Design Graphique & Identité Visuelle",
                  desc: "Création d'identités visuelles complètes : logos, chartes graphiques, supports print et numériques qui reflètent l'essence de votre marque.",
                },
                {
                  icon: Users,
                  title: "UI/UX Design & Prototypage",
                  desc: "Interfaces intuitives et design fonctionnel pour applications mobiles et plateformes web. Prototypage interactif sur Figma pour valider chaque concept.",
                },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  animate={servicesInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={i + 1}
                  className="card-glass rounded-2xl p-6 hover:border-gold/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                    <service.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={4}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/solutions-design"
                className="inline-flex items-center gap-2 text-gold font-medium hover:underline underline-offset-4 transition-all"
              >
                Découvrir tous mes services <ArrowRight size={16} />
              </Link>
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold font-medium transition-colors"
              >
                <Briefcase size={16} /> Voir mon portfolio
              </Link>
              <Link
                to="/formations"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold font-medium transition-colors"
              >
                <BookOpen size={16} /> Mes formations
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Section 5 — CTA ── */}
        <section className="px-6 py-24" ref={ctaRef}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Travaillons <span className="gradient-text">Ensemble</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                Vous avez un projet de site web, d'identité visuelle ou d'application ?
                Discutons de vos objectifs et donnons vie à votre vision.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={1}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-gold bg-gold text-primary-foreground font-semibold hover:bg-transparent hover:text-gold transition-all duration-300 glow-gold"
              >
                Me contacter <ArrowRight size={16} />
              </Link>
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border text-foreground font-medium hover:border-gold hover:text-gold transition-all duration-300"
              >
                Voir mes réalisations
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
