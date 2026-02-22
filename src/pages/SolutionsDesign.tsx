import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SolutionsDesign = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Solutions Design — Conception Web, UI/UX & Identité Visuelle</title>
        <meta name="description" content="Services de design sur mesure : conception de sites web, UI/UX Design, identité visuelle de marque et design graphique. Devis gratuit." />
        <link rel="canonical" href="https://mbutheudesign.com/solutions-design" />
        <meta property="og:title" content="Solutions Design — Conception Web, UI/UX & Identité Visuelle" />
        <meta property="og:description" content="Services de design sur mesure : conception de sites web, UI/UX Design, identité visuelle de marque et design graphique. Devis gratuit." />
        <meta property="og:url" content="https://mbutheudesign.com/solutions-design" />
      </Helmet>
      <Navbar />
      <main className="pt-20 px-6">
        <div className="max-w-6xl mx-auto py-20">
          <h1 className="font-display text-4xl font-bold text-foreground">Solutions Design</h1>
          <p className="text-muted-foreground mt-4">Page en construction.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SolutionsDesign;
