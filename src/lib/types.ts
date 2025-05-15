
export type NavItem = {
  href: string;
  label: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO string format e.g. "2023-10-26T00:00:00.000Z"
  excerpt: string;
  category: string;
  tags: string[];
  imageUrl?: string; // Optional image URL
  imageHint?: string; // Optional hint for placeholder image generation
  content: string; // Markdown content
};

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  projectUrl?: string; // Link to live project
  repoUrl?: string; // Link to GitHub repository
  technologies: string[];
};
