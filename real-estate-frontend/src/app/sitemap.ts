import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bricksage.in';

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/projects/apartments-mumbai-thane`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/projects/plots-mumbai-thane`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/projects/commercial-projects-mumbai-thane`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/projects/new-launch-projects-mumbai-thane`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-use`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/rera-disclosure`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
    if (apiUrl.includes('localhost')) {
      apiUrl = apiUrl.replace('localhost', '127.0.0.1');
    }

    const projectsRes = await fetch(`${apiUrl}/projects?limit=1000`, { next: { revalidate: 3600 } });
    let projectPages: MetadataRoute.Sitemap = [];
    if (projectsRes.ok) {
      const projectsData = await projectsRes.json();
      const projects = projectsData.data?.projects || [];
      projectPages = projects.map((p: any) => ({
        url: `${baseUrl}/projects/${p.slug || p.id}`,
        lastModified: new Date(p.updatedAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }

    const blogsRes = await fetch(`${apiUrl}/blog?limit=1000`, { next: { revalidate: 3600 } });
    let blogPages: MetadataRoute.Sitemap = [];
    if (blogsRes.ok) {
      const blogsData = await blogsRes.json();
      const posts = blogsData.data?.posts || [];
      blogPages = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug || post.id}`,
        lastModified: new Date(post.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }

    return [...staticPages, ...projectPages, ...blogPages];
  } catch (error) {
    console.error("Error fetching dynamic routes for sitemap:", error);
    return staticPages;
  }
}
