
-- 1. Create app_role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: only admins can read
CREATE POLICY "Admins can read user_roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  category VARCHAR(100),
  tags TEXT[],
  cover_image_url VARCHAR(500),
  cover_image_alt VARCHAR(255),
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Public can read published articles"
  ON public.articles FOR SELECT
  USING (status = 'published');

-- Admins have full CRUD
CREATE POLICY "Admins can manage articles"
  ON public.articles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100),
  description TEXT,
  content JSONB,
  images TEXT[],
  tools TEXT[],
  external_url VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published projects"
  ON public.projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. Design settings table
CREATE TABLE public.design_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.design_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read design_settings"
  ON public.design_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage design_settings"
  ON public.design_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Animation settings table
CREATE TABLE public.animation_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.animation_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read animation_settings"
  ON public.animation_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage animation_settings"
  ON public.animation_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Site settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site_settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site_settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 7. Update comments table: add admin policies for UPDATE/DELETE/full SELECT
CREATE POLICY "Admins can read all comments"
  ON public.comments FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update comments"
  ON public.comments FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete comments"
  ON public.comments FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_design_settings_updated_at
  BEFORE UPDATE ON public.design_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_animation_settings_updated_at
  BEFORE UPDATE ON public.animation_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Enable realtime for comments (admin notifications)
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;

-- 10. Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-assets', 'admin-assets', true);

-- Public read on all buckets
CREATE POLICY "Public can read blog-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Public can read project-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Public can read admin-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'admin-assets');

-- Admin write on all buckets
CREATE POLICY "Admins can upload blog-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload project-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload admin-assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'admin-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update admin-assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'admin-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete admin-assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'admin-assets' AND public.has_role(auth.uid(), 'admin'));
