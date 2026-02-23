import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function getSessionId(): string {
  let id = localStorage.getItem("blog_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("blog_session_id", id);
  }
  return id;
}

interface LikeButtonProps {
  articleSlug: string;
}

export default function LikeButton({ articleSlug }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  const sessionId = getSessionId();

  const fetchLikes = useCallback(async () => {
    const { count: total } = await supabase
      .from("article_likes")
      .select("*", { count: "exact", head: true })
      .eq("article_slug", articleSlug);

    setCount(total ?? 0);

    const { data } = await supabase
      .from("article_likes")
      .select("id")
      .eq("article_slug", articleSlug)
      .eq("session_id", sessionId)
      .maybeSingle();

    setLiked(!!data);
  }, [articleSlug, sessionId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const toggleLike = async () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    if (liked) {
      await supabase
        .from("article_likes")
        .delete()
        .eq("article_slug", articleSlug)
        .eq("session_id", sessionId);
      setLiked(false);
      setCount((c) => Math.max(0, c - 1));
    } else {
      await supabase
        .from("article_likes")
        .insert({ article_slug: articleSlug, session_id: sessionId });
      setLiked(true);
      setCount((c) => c + 1);
    }
  };

  return (
    <motion.button
      onClick={toggleLike}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 text-sm font-medium ${
        liked
          ? "border-red-500/50 bg-red-500/10 text-red-400"
          : "border-border bg-card text-muted-foreground hover:border-gold/30 hover:text-gold"
      }`}
      whileTap={{ scale: 0.95 }}
      aria-label={liked ? "Retirer le j'aime" : "Aimer cet article"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={liked ? "liked" : "not-liked"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: animating ? 1.3 : 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Heart
            size={18}
            className={liked ? "fill-red-400 text-red-400" : ""}
          />
        </motion.span>
      </AnimatePresence>
      <span>J'aime</span>
      <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
        {count}
      </span>
    </motion.button>
  );
}
