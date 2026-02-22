import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portfolio — Réalisations UI/UX & Web Design | MBUTHEU DESIGN</title>
        <meta name="description" content="Découvrez le portfolio de MBUTHEU DESIGN : sites vitrines, applications mobiles, identités de marque et dashboards conçus avec Figma et Webflow." />
        <link rel="canonical" href="https://mbutheudesign.com/projets" />
        <meta property="og:title" content="Portfolio — Réalisations UI/UX & Web Design | MBUTHEU DESIGN" />
        <meta property="og:description" content="Découvrez le portfolio de MBUTHEU DESIGN : sites vitrines, applications mobiles, identités de marque et dashboards conçus avec Figma et Webflow." />
        <meta property="og:url" content="https://mbutheudesign.com/projets" />
      </Helmet>
      <Navbar />
      <main className="pt-20 px-6">
        <div className="max-w-6xl mx-auto py-20">
          <h1 className="font-display text-4xl font-bold text-foreground">Projets</h1>
          <p className="text-muted-foreground mt-4">Page en construction.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
