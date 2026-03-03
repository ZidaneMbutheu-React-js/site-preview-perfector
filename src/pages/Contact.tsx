import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useSearchParams } from "react-router-dom";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const utmSource = searchParams.get("utm_source");

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
      <main className="pt-20">
        <ContactSection defaultProjectType={utmSource === "formations" ? "formation" : undefined} />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
