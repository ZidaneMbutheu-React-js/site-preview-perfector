import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTOCProps {
  content: string;
}

export function extractHeadings(html: string): TOCItem[] {
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  const items: TOCItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    if (!text) continue;
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    items.push({ id, text, level: parseInt(match[1]) });
  }
  return items;
}

export function injectHeadingIds(html: string, headings: TOCItem[]): string {
  let idx = 0;
  return html.replace(/<h([23])([^>]*)>/gi, (full, level, attrs) => {
    if (idx < headings.length) {
      const heading = headings[idx];
      idx++;
      if (attrs.includes("id=")) return full;
      return `<h${level} id="${heading.id}"${attrs}>`;
    }
    return full;
  });
}

export default function ArticleTOC({ content }: ArticleTOCProps) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden xl:block w-[240px] shrink-0">
        <div className="sticky top-28">
          <div
            className="rounded-2xl p-5 border"
            style={{
              background: "linear-gradient(135deg, rgba(13,16,33,0.8) 0%, rgba(17,24,39,0.6) 100%)",
              borderColor: "rgba(245,166,35,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <List size={14} style={{ color: "#F5A623" }} />
              <span
                className="font-display text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#F5A623" }}
              >
                Sommaire
              </span>
            </div>

            <nav className="space-y-1" aria-label="Table des matières">
              {headings.map((h) => (
                <button
                  key={h.id}
                  onClick={() => scrollTo(h.id)}
                  className={cn(
                    "w-full text-left text-[13px] leading-snug py-1.5 px-3 rounded-lg transition-all duration-200 block",
                    h.level === 3 && "pl-6"
                  )}
                  style={{
                    color:
                      activeId === h.id
                        ? "#F5A623"
                        : "rgba(234,229,217,0.55)",
                    background:
                      activeId === h.id
                        ? "rgba(245,166,35,0.08)"
                        : "transparent",
                    borderLeft:
                      activeId === h.id
                        ? "2px solid #F5A623"
                        : "2px solid transparent",
                  }}
                >
                  {h.text}
                </button>
              ))}
            </nav>

            {/* Progress */}
            <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(245,166,35,0.1)" }}>
              <div className="flex items-center justify-between text-[10px] mb-1.5" style={{ color: "rgba(234,229,217,0.4)" }}>
                <span>Progression</span>
                <span>
                  {headings.findIndex((h) => h.id === activeId) + 1}/{headings.length}
                </span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(245,166,35,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#F5A623" }}
                  animate={{
                    width: `${((headings.findIndex((h) => h.id === activeId) + 1) / headings.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile floating button + drawer */}
      <div className="xl:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-20 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full border bg-surface/90 backdrop-blur-md transition-all duration-300"
          style={{ borderColor: "rgba(245,166,35,0.4)", color: "#F5A623" }}
          aria-label="Sommaire"
        >
          <List size={18} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                style={{ background: "rgba(6,8,16,0.7)", backdropFilter: "blur(4px)" }}
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl p-6 border-t max-h-[60vh] overflow-y-auto"
                style={{
                  background: "#0D1021",
                  borderColor: "rgba(245,166,35,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <List size={14} style={{ color: "#F5A623" }} />
                  <span className="font-display text-sm font-semibold" style={{ color: "#F5A623" }}>
                    Sommaire
                  </span>
                </div>
                <nav className="space-y-1">
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => scrollTo(h.id)}
                      className={cn(
                        "w-full text-left text-sm py-2 px-3 rounded-lg flex items-center gap-2 transition-all",
                        h.level === 3 && "pl-7"
                      )}
                      style={{
                        color: activeId === h.id ? "#F5A623" : "rgba(234,229,217,0.6)",
                        background: activeId === h.id ? "rgba(245,166,35,0.08)" : "transparent",
                      }}
                    >
                      <ChevronRight size={12} className="shrink-0" />
                      {h.text}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
