// app/robots.ts
import { MetadataRoute } from 'next';

// IMPORTANT: Replace 'https://www.yournewssite.com' with your actual domain.
const BASE_URL = 'https://www.khabar24live.com'; 

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Applies to all bots
        userAgent: '*',
        // Allow access to the entire site
        allow: '/',
        // Disallow access to common non-public areas
        disallow: ['/admin/', '/private/', '/amp/'],
      },
      // You can add specific rules for certain bots if needed (e.g., Googlebot)
    ],
    
    // Crucial: Point to your main sitemap file
    sitemap: `${BASE_URL}/sitemap.xml`,
    
    // Specify the preferred domain
    host: BASE_URL,
  };
}