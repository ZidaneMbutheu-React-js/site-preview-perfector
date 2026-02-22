import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Formations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Formations Design — UI/UX, Figma & Webflow | MBUTHEU DESIGN</title>
        <meta name="description" content="Formez-vous au design avec MBUTHEU DESIGN : formations UI/UX, maîtrise de Figma, création de sites Wordpress et identité visuelle. Pour débutants et professionnels." />
        <link rel="canonical" href="https://mbutheudesign.com/formations" />
        <meta property="og:title" content="Formations Design — UI/UX, Figma & Webflow | MBUTHEU DESIGN" />
        <meta property="og:description" content="Formez-vous au design avec MBUTHEU DESIGN : formations UI/UX, maîtrise de Figma, création de sites Wordpress et identité visuelle. Pour débutants et professionnels." />
        <meta property="og:url" content="https://mbutheudesign.com/formations" />
      </Helmet>
      <Navbar />
      <main className="pt-20 px-6">
        <div className="max-w-6xl mx-auto py-20">
          <h1 className="font-display text-4xl font-bold text-foreground">Formations</h1>
          <p className="text-muted-foreground mt-4">Page en construction.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Formations;
