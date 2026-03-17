export type ProjectCategory = "Tous" | "UI/UX Design" | "Publicité" | "Poster Design";

export interface BehanceProject {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  link: string;
  tags: string[];
}

export const categories: ProjectCategory[] = [
  "Tous",
  "UI/UX Design",
  "Publicité",
  "Poster Design",
];

export const behanceProjects: BehanceProject[] = [
  // ── UI/UX Design ──
  {
    id: "architecture",
    title: "Architecture Website — UI/UX Design",
    category: "UI/UX Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/798070244452161.Y3JvcCw0MDkxLDMyMDAsODAwLDA.png",
    link: "https://www.behance.net/gallery/244452161/Architecture-Website-UIUX-Dedsign",
    tags: ["UI/UX", "Web Design", "Figma"],
  },
  {
    id: "ecommerce",
    title: "Modern E-commerce — UI/UX Design",
    category: "UI/UX Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/a18b5f244452031.Y3JvcCw0MDkxLDMyMDAsODAwLDA.png",
    link: "https://www.behance.net/gallery/244452031/Modern-E-commerce-UIUX-Design",
    tags: ["E-commerce", "UI/UX", "Figma"],
  },
  {
    id: "farm",
    title: "Farm Website — UI/UX Design",
    category: "UI/UX Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/c40932243689309.Y3JvcCw0MDkxLDMyMDAsODAwLDA.png",
    link: "https://www.behance.net/gallery/243689309/Farm-Website-UIUX-Design",
    tags: ["UI/UX", "Web Design", "Agriculture"],
  },
  {
    id: "hero-section",
    title: "Hero Section — Page Design",
    category: "UI/UX Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/b11e58242751655.Y3JvcCw0MDkxLDMyMDAsODAwLDA.png",
    link: "https://www.behance.net/gallery/242751655/Hero-Section-Page",
    tags: ["Web Design", "UI/UX", "Landing Page"],
  },

  // ── Publicité ──
  {
    id: "ads-banner-1",
    title: "Ads Banner — Design Publicitaire",
    category: "Publicité",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/02b7ab243246301.Y3JvcCw0MDAxLDMxMzAsNDE2LDA.png",
    link: "https://www.behance.net/gallery/243246301/Ads-banner",
    tags: ["Social Media", "Advertising", "Illustrator"],
  },
  {
    id: "ads-banner-2",
    title: "Ads Banner — Campagne Digitale",
    category: "Publicité",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/17a0fe243246233.Y3JvcCw0Nzg0LDM3NDEsMCwyNTY5.png",
    link: "https://www.behance.net/gallery/243246233/Ads-Banner",
    tags: ["Social Media", "Advertising", "Photoshop"],
  },
  {
    id: "ads-banner-3",
    title: "Ads Banner — Création Visuelle",
    category: "Publicité",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/abe6a6243246129.Y3JvcCw0Nzg0LDM3NDEsMCwyMjYx.png",
    link: "https://www.behance.net/gallery/243246129/Ads-Banner",
    tags: ["Graphic Design", "Advertising"],
  },
  {
    id: "ads-design",
    title: "Ads Design — Visuel Marketing",
    category: "Publicité",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/5bbbcd242828305.Y3JvcCwyNTAwLDE5NTUsMCw4Ng.png",
    link: "https://www.behance.net/gallery/242828305/Ads-design",
    tags: ["Marketing", "Social Media", "Illustrator"],
  },
  {
    id: "phone-price",
    title: "Phone Price Poster — Publicité Produit",
    category: "Publicité",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/19070e227980683.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.jpg",
    link: "https://www.behance.net/gallery/227980683/phone-price-poster",
    tags: ["Produit", "Publicité", "Photoshop"],
  },

  // ── Poster Design ──
  {
    id: "coming-soon",
    title: "Coming Soon — Poster Événementiel",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/97578a243640519.Y3JvcCwyNTAwLDE5NTUsMCwzMzQ.png",
    link: "https://www.behance.net/gallery/243640519/Coming-soon-poster",
    tags: ["Poster", "Typographie", "Événementiel"],
  },
  {
    id: "happy-february",
    title: "Happy February — Poster Créatif",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/5af032243639607.Y3JvcCw1MDAwLDM5MTAsMCw2Njg.png",
    link: "https://www.behance.net/gallery/243639607/Happy-February",
    tags: ["Poster", "Illustration", "Créatif"],
  },
  {
    id: "ad-poster-1",
    title: "Ad Poster — Affiche Publicitaire",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/dd3130242551273.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.png",
    link: "https://www.behance.net/gallery/242551273/Ad-poster",
    tags: ["Poster", "Graphic Design"],
  },
  {
    id: "ad-poster-2",
    title: "Ad Poster — Design Visuel",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/b65d41242551105.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.png",
    link: "https://www.behance.net/gallery/242551105/Ad-poster",
    tags: ["Poster", "Photoshop"],
  },
  {
    id: "ad-poster-3",
    title: "Ad Poster — Composition Graphique",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/538d3e242550955.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.png",
    link: "https://www.behance.net/gallery/242550955/Ad-poster",
    tags: ["Poster", "Illustrator"],
  },
  {
    id: "ad-poster-4",
    title: "Ad Poster — Création Artistique",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/1fc156242550735.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.png",
    link: "https://www.behance.net/gallery/242550735/Ad-poster",
    tags: ["Poster", "Graphic Design"],
  },
  {
    id: "ad-poster-5",
    title: "Ad Poster — Affiche Moderne",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/c4d983242550537.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.png",
    link: "https://www.behance.net/gallery/242550537/Ad-poster",
    tags: ["Poster", "Minimaliste"],
  },
  {
    id: "ad-poster-6",
    title: "Ad Poster — Design Épuré",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/f25fd4242550239.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.png",
    link: "https://www.behance.net/gallery/242550239/Ad-poster",
    tags: ["Poster", "Créatif"],
  },
  {
    id: "poster-design",
    title: "Poster Design — Affiche Artistique",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/21a282241710589.Y3JvcCw1MDAwLDM5MTAsMCw1NDQ.png",
    link: "https://www.behance.net/gallery/241710589/poster-design",
    tags: ["Poster", "Typographie"],
  },
  {
    id: "poste-design",
    title: "Poste Design — Création Visuelle",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/75b9ad242680225.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.png",
    link: "https://www.behance.net/gallery/242680225/Poste-design",
    tags: ["Poster", "Graphic Design"],
  },
  {
    id: "happy-new-year",
    title: "Happy New Year — Posters Festifs",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/8d8796241383637.Y3JvcCwxMjAwLDkzOCwwLDEzMA.png",
    link: "https://www.behance.net/gallery/241383637/Happy-New-year-posters",
    tags: ["Poster", "Festif", "Illustrator"],
  },
  {
    id: "christmas",
    title: "Christmas Posters — Design Festif",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/b422a5240964185.Y3JvcCw1MDAwLDM5MTAsMCw1NDQ.png",
    link: "https://www.behance.net/gallery/240964185/Chrismas-posters",
    tags: ["Poster", "Noël", "Créatif"],
  },
  {
    id: "happy-weekdays",
    title: "Happy Week Days — Poster Quotidien",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/4f3ac5240962967.Y3JvcCw1MDAwLDM5MTAsMCw1NDQ.png",
    link: "https://www.behance.net/gallery/240962967/Happy-week-days-Poster",
    tags: ["Poster", "Illustration"],
  },
  {
    id: "poster-classic",
    title: "Poster — Design Classique",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/5cc76d230195793.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.jpg",
    link: "https://www.behance.net/gallery/230195793/Poster",
    tags: ["Poster", "Classique"],
  },
  {
    id: "cover-music",
    title: "Cover Music — Pochette Musicale",
    category: "Poster Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/198b00227979979.Y3JvcCwyNTAwLDE5NTUsMCwyNzI.jpg",
    link: "https://www.behance.net/gallery/227979979/Cover-music-poste",
    tags: ["Musique", "Cover Art", "Photoshop"],
  },
];
