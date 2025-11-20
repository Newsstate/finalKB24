// app/sitemap.ts
import { MetadataRoute } from 'next';

// Re-using the API URL
const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
const BASE_URL = 'https://www.khabar24live.com'; 

// Define categories to include in the sitemap
const categories = [
    'entertainment', 'latest', 'bihar', 'uttar-pradesh', 'madhya-pradesh', 
    'rajasthan', 'uttarakhand', 'jharkhand', 'chhattisgarh', 'delhi-ncr', 
    'sports', 'business', 'share-market', 'technology', 'religion', 
    'horoscope', 'panchang', 'chalisa-aarti', 'lifestyle',
];

interface WpPost {
    id: number;
    slug: string;
    modified_gmt: string;
    _embedded: {
      'wp:term'?: { 
        slug: string;
      }[][];
    }
}

async function getRecentPosts(): Promise<WpPost[]> {
  // Fetch the latest 1000 posts (max number of URLs per sitemap is 50,000)
  try {
    const res = await fetch(`${API_URL}/posts?_fields=slug,id,modified_gmt,categories&per_page=1000`, {
        // High revalidation time since sitemap updates automatically on build
        next: { revalidate: 3600 } 
    });
    if (!res.ok) { return []; }
    return res.json();
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
  }
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getRecentPosts();

  // 1. Static Pages (Home, About, Contact, etc.)
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'always', // Home page changes constantly
      priority: 1,
    },
    // Example static pages (create these files if they don't exist)
    {
        url: `${BASE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    },
    {
        url: `${BASE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    },
  ];

  // 2. Category Pages
  const categoryUrls: MetadataRoute.Sitemap = categories.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 3. Dynamic Article Pages
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => {
    // We use the same slug-and-ID format as defined for your article pages
    const articleSlug = post.slug;
    const articleId = post.id;
    
    return {
      url: `${BASE_URL}/${articleSlug}-${articleId}`,
      lastModified: post.modified_gmt, // Use the modified date for freshness
      changeFrequency: 'hourly', // News articles change often
      priority: 0.8,
    };
  });
  
  // Combine all URL sets
  return [...staticUrls, ...categoryUrls, ...postUrls];
}