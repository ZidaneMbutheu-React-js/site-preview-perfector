import { Heart, ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const footerNav = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/a-propos" },
      { label: "Projets", href: "/projets" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Solutions Design", href: "/solutions-design" },
      { label: "Formations", href: "/formations" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block font-display font-bold text-xl">
              <span className="gradient-text">MBUTHEU</span>
              <span className="text-foreground"> DESIGN</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Designer UI/UX freelance — Création d'identités visuelles, sites web sur mesure et interfaces modernes.
            </p>
            <a
              href="https://www.behance.net/zidanembutheu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              <ExternalLink size={13} />
              Behance
              <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs flex items-center gap-1.5">
            Fait avec <Heart size={12} className="text-gold fill-gold" /> — Tous droits réservés © {new Date().getFullYear()}
          </p>
          <Link
            to="/contact"
            className="text-xs text-gold hover:underline underline-offset-4 transition-colors"
          >
            Me contacter →
          </Link>
        </div>
      </div>
    </footer>
  );
}
