// Each file in content/projects/ is one project, edited through the CMS.
// The file name (without .json) is the project's URL slug.
export type Category = 'residential' | 'commercial' | 'hospitality';

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  order?: number;
  category: Category;
  location: string;
  date: string;
  collaborations?: string[];
  description: string;
  heroImage: string;
  gallery: GalleryItem[];
}

const files = import.meta.glob<Omit<Project, 'id'>>('../../../content/projects/*.json', {
  eager: true,
  import: 'default',
});

export const projects: Project[] = Object.entries(files)
  .map(([path, data]) => ({
    ...data,
    id: path.split('/').pop()!.replace(/\.json$/, ''),
    gallery: data.gallery ?? [],
  }))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title));
