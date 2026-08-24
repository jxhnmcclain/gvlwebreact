import contentSnapshot from '../content/generated-content.json';

export interface PortfolioAsset {
  type: 'image' | 'video' | 'embed';
  url: string;
  alt: string;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  sortOrder: number;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  client?: string | null;
  summary?: string | null;
  challenge?: string | null;
  approach?: string | null;
  outcome?: string | null;
  services: string[];
  industry?: string | null;
  year?: number | null;
  cover?: string | null;
  coverAlt: string;
  featured: boolean;
  sortOrder: number;
  publishedAt: string;
  updatedAt?: string;
  assets: PortfolioAsset[];
}

export function getAllPortfolioProjects(): PortfolioProject[] {
  return (contentSnapshot.portfolio as PortfolioProject[]).slice();
}

export function getPortfolioProject(slug: string): PortfolioProject | null {
  return getAllPortfolioProjects().find((project) => project.slug === slug) ?? null;
}

export function getFeaturedPortfolioProjects(limit = 3): PortfolioProject[] {
  const projects = getAllPortfolioProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}
