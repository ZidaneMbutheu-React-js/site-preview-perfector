import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>À propos — MBUTHEU DESIGN, Designer UI/UX Freelance</title>
        <meta name="description" content="Découvrez la vision et l'approche de MBUTHEU DESIGN : création d'expériences numériques sur mesure, design graphique et UI/UX pour marques ambitieuses." />
        <link rel="canonical" href="https://mbutheudesign.com/a-propos" />
        <meta property="og:title" content="À propos — MBUTHEU DESIGN, Designer UI/UX Freelance" />
        <meta property="og:description" content="Découvrez la vision et l'approche de MBUTHEU DESIGN : création d'expériences numériques sur mesure, design graphique et UI/UX pour marques ambitieuses." />
        <meta property="og:url" content="https://mbutheudesign.com/a-propos" />
      </Helmet>
      <Navbar />
      <main className="pt-20 px-6">
        <div className="max-w-6xl mx-auto py-20">
          <h1 className="font-display text-4xl font-bold text-foreground">À propos</h1>
          <p className="text-muted-foreground mt-4">Page en construction.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
