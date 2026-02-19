import { Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display font-bold gradient-text text-lg">MBUTHEU DESIGN</p>
        <p className="text-muted-foreground text-sm flex items-center gap-1.5">
          Fait avec <Heart size={12} className="text-gold fill-gold" /> — Tous droits réservés © 2024
        </p>
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
    </footer>
  );
}
