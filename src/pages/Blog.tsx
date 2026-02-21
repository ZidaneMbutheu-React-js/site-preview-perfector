import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowLeft, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  {
    id: "tendances-web-design-2024",
    title: "Les tendances Web Design à suivre en 2024",
    excerpt: "Découvrez les tendances incontournables du web design : du bento grid au motion design, en passant par le glassmorphisme et les typographies XXL.",
    category: "Web Design",
    date: "15 Déc 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
  },
  {
    id: "importance-ui-ux",
    title: "Pourquoi le UI/UX Design est essentiel pour votre business",
    excerpt: "Un bon design UI/UX augmente la conversion de 200%. Découvrez comment investir dans l'expérience utilisateur peut transformer votre activité.",
    category: "UI/UX",
    date: "8 Déc 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
  },
  {
    id: "identite-visuelle-marque",
    title: "Créer une identité visuelle forte pour votre marque",
    excerpt: "Logo, palette de couleurs, typographie — les éléments clés pour construire une identité de marque mémorable et cohérente.",
    category: "Branding",
    date: "1 Déc 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  {
    id: "figma-astuces-productivite",
    title: "10 astuces Figma pour booster votre productivité",
    excerpt: "Auto Layout, composants, variables — maîtrisez ces fonctionnalités Figma pour accélérer vos workflows de design.",
    category: "Outils",
    date: "22 Nov 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=400&fit=crop",
  },
  {
    id: "motion-design-web",
    title: "Le Motion Design au service du web",
    excerpt: "Comment les micro-interactions et animations subtiles peuvent transformer l'expérience utilisateur de votre site web.",
    category: "Motion Design",
    date: "15 Nov 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
  },
  {
    id: "responsive-design-mobile-first",
    title: "Responsive Design : l'approche Mobile First en 2024",
    excerpt: "Avec 60% du trafic web sur mobile, l'approche mobile-first n'est plus optionnelle. Guide pratique pour un design vraiment responsive.",
    category: "Web Design",
    date: "5 Nov 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8"
            >
              <ArrowLeft size={14} />
              Retour au portfolio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Blog</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Articles & <span className="gradient-text">Ressources</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Conseils, tendances et retours d'expérience sur le design web, UI/UX et le graphisme.
            </p>
          </motion.div>

          {/* Articles grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-glass rounded-2xl border border-border overflow-hidden group hover:border-gold/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-medium flex items-center gap-1">
                    <Tag size={10} />
                    {article.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-foreground text-lg leading-tight mb-2 group-hover:text-gold transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                    Lire l'article
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
