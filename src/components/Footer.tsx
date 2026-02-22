import { Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/solutions-design" },
  { label: "Projets", href: "/projets" },
  { label: "Blog", href: "/blog" },
  { label: "Formations", href: "/formations" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-display font-bold gradient-text text-lg">
            MBUTHEU DESIGN
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-muted-foreground hover:text-gold transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://www.behance.net/zidanembutheu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-gold transition-colors text-sm"
          >
            <ExternalLink size={13} />
            Behance
          </a>
        </div>
        <p className="text-muted-foreground text-xs text-center flex items-center justify-center gap-1.5">
          Fait avec <Heart size={12} className="text-gold fill-gold" /> — Tous droits réservés © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
