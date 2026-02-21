import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-surface/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-display text-xl font-bold gradient-text">
          MBUTHEU<span className="text-foreground"> DESIGN</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  className="text-muted-foreground hover:text-gold transition-colors text-sm font-medium tracking-wide"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-gold transition-colors text-sm font-medium tracking-wide"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300 glow-gold"
        >
          Me contacter
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
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
            className="md:hidden bg-surface border-b border-border px-6 pb-6"
          >
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-muted-foreground hover:text-gold transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-muted-foreground hover:text-gold transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
