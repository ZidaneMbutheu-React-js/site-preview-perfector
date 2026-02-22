import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Solutions Design", href: "/solutions-design" },
  { label: "Projets", href: "/projets" },
  { label: "Blog", href: "/blog" },
  { label: "Formations", href: "/formations" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-surface/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold gradient-text">
          MBUTHEU<span className="text-foreground"> DESIGN</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  location.pathname === link.href
                    ? "text-gold"
                    : "text-muted-foreground hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center px-5 py-2 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300 glow-gold"
        >
          Me contacter
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface border-b border-border px-6 pb-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-gold"
                    : "text-muted-foreground hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center mt-3 px-5 py-2 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300"
            >
              Me contacter
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
