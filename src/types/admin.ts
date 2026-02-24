export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  tags: string[] | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminProject {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  description: string | null;
  content: Record<string, string> | null;
  images: string[] | null;
  tools: string[] | null;
  external_url: string | null;
  display_order: number;
  status: 'draft' | 'published' | 'archived';
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminComment {
  id: string;
  article_slug: string;
  first_name: string;
  email: string;
  website: string | null;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface DesignSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface AnimationSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}
