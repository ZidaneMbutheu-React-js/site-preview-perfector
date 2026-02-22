import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact — Démarrons votre projet | MBUTHEU DESIGN</title>
        <meta name="description" content="Contactez MBUTHEU DESIGN pour votre projet web, UI/UX ou identité visuelle. Réponse sous 24h. Disponible partout dans le monde." />
        <link rel="canonical" href="https://mbutheudesign.com/contact" />
        <meta property="og:title" content="Contact — Démarrons votre projet | MBUTHEU DESIGN" />
        <meta property="og:description" content="Contactez MBUTHEU DESIGN pour votre projet web, UI/UX ou identité visuelle. Réponse sous 24h. Disponible partout dans le monde." />
        <meta property="og:url" content="https://mbutheudesign.com/contact" />
      </Helmet>
      <Navbar />
      <main className="pt-20 px-6">
        <div className="max-w-6xl mx-auto py-20">
          <h1 className="font-display text-4xl font-bold text-foreground">Contact</h1>
          <p className="text-muted-foreground mt-4">Page en construction.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
