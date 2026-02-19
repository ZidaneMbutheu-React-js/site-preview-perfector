import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display font-bold gradient-text text-lg">KimiAgent</p>
        <p className="text-muted-foreground text-sm flex items-center gap-1.5">
          Fait avec <Heart size={12} className="text-gold fill-gold" /> en 2024 — Tous droits réservés
        </p>
        <div className="flex gap-6">
          {["Accueil", "Projets", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link === "Accueil" ? "hero" : link.toLowerCase()}`}
              className="text-muted-foreground hover:text-gold transition-colors text-sm"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
