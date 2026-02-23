import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { articles, Article } from "@/data/articles";

interface RelatedArticlesProps {
  currentSlug: string;
  relatedSlugs?: string[];
}

export default function RelatedArticles({ currentSlug, relatedSlugs }: RelatedArticlesProps) {
  let related: Article[];

  if (relatedSlugs?.length) {
    related = relatedSlugs
      .map((slug) => articles.find((a) => a.id === slug))
      .filter((a): a is Article => !!a && a.id !== currentSlug)
      .slice(0, 3);
  } else {
    const current = articles.find((a) => a.id === currentSlug);
    related = articles
      .filter((a) => a.id !== currentSlug && a.category === current?.category)
      .slice(0, 3);

    if (related.length < 3) {
      const more = articles
        .filter((a) => a.id !== currentSlug && !related.includes(a))
        .slice(0, 3 - related.length);
      related = [...related, ...more];
    }
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Lire aussi
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/blog/${article.id}`}
              className="group card-glass rounded-xl border border-border p-4 block hover:border-gold/30 transition-all duration-300"
            >
              <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-medium flex items-center gap-1">
                  <Tag size={8} />
                  {article.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                <Calendar size={10} />
                {article.date}
              </p>
              <h3 className="font-display font-semibold text-foreground text-sm leading-snug group-hover:text-gold transition-colors mb-2">
                {article.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-gold text-xs font-medium group-hover:gap-2 transition-all">
                Lire <ArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
