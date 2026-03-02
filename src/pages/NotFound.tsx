import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Briefcase, Mail } from "lucide-react";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Projets", href: "/projets", icon: Briefcase },
  { label: "Contact", href: "/contact", icon: Mail },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <span className="text-8xl font-display font-bold gradient-text">404</span>
        <h1 className="mt-4 text-2xl md:text-3xl font-display font-bold text-foreground">
          Oops — Cette page s'est perdue dans les pixels
        </h1>
        <p className="mt-4 text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300"
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
