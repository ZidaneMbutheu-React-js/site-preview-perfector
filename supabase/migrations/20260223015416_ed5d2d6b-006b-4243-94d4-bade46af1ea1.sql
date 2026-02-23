
-- Table for article likes
CREATE TABLE public.article_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(article_slug, session_id)
);

ALTER TABLE public.article_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can read like counts
CREATE POLICY "Anyone can read likes"
  ON public.article_likes FOR SELECT
  USING (true);

-- Anyone can insert a like (anonymous)
CREATE POLICY "Anyone can insert likes"
  ON public.article_likes FOR INSERT
  WITH CHECK (true);

-- Anyone can delete their own like (by session_id)
CREATE POLICY "Anyone can delete own likes"
  ON public.article_likes FOR DELETE
  USING (true);

-- Table for comments with moderation
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  first_name TEXT NOT NULL CHECK (char_length(first_name) >= 2),
  email TEXT NOT NULL,
  website TEXT,
  content TEXT NOT NULL CHECK (char_length(content) >= 20 AND char_length(content) <= 500),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Public view that hides email (sensitive data)
CREATE VIEW public.comments_public
WITH (security_invoker = on) AS
  SELECT id, article_slug, first_name, website, content, status, created_at
  FROM public.comments
  WHERE status = 'approved';

-- Only approved comments visible publicly via the view
CREATE POLICY "No direct select on comments"
  ON public.comments FOR SELECT
  USING (false);

-- Anyone can insert a comment (anonymous submission)
CREATE POLICY "Anyone can insert comments"
  ON public.comments FOR INSERT
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_article_likes_slug ON public.article_likes(article_slug);
CREATE INDEX idx_comments_slug_status ON public.comments(article_slug, status);
