// app/sitemap.ts
import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.khabar24live.com';
const API_URL = 'https://khabar24live.com/wp-json/wp/v2';

// --- Type Definitions for WordPress Data ---
interface Post {
    id: number;
    slug: string;
    date: string;
    modified: string;
    // We assume the category slug is needed for the URL structure
    categories: number[]; // In a real app, you would resolve this ID to a slug
}

interface Category {
    id: number;
    slug: string;
}

// --- Data Fetching Functions (Mocked) ---

/**
 * Fetches the IDs and slugs for all posts.
 * For production, this should fetch all necessary posts, ideally with pagination.
 */
async function getPostSlugs(): Promise<Post[]> {
    try {
        // Fetch all pages of posts (up to 100 posts per request is common)
        const res = await fetch(`${API_URL}/posts?_fields=id,slug,date,modified&per_page=100&page=1`);
        if (!res.ok) return [];
        
        // IMPORTANT: In a production scenario, you would need a loop here 
        // to fetch all pages until the 'X-WP-TotalPages' header is empty.
        const posts = await res.json();
        return posts;
    } catch (error) {
        console.error("Sitemap: Failed to fetch posts:", error);
        return [];
    }
}

/**
 * Fetches all category slugs.
 */
async function getCategorySlugs(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_URL}/categories?_fields=id,slug&per_page=100`);
        if (!res.ok) return [];
        const categories = await res.json();
        return categories;
    } catch (error) {
        console.error("Sitemap: Failed to fetch categories:", error);
        return [];
    }
}


// --- Main Sitemap Generation Function ---

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    
    // 1. Standard Static Pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: 'daily' },
        { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' },
    ];


    // 2. Dynamic Categories Links
    const categoryLinks: MetadataRoute.Sitemap = (await getCategorySlugs()).map(cat => {
        return {
            url: `${BASE_URL}/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        };
    });


    // 3. Dynamic Post Links
    const postLinks: MetadataRoute.Sitemap = (await getPostSlugs()).map(post => {
        // NOTE: This assumes you have a way to reliably get the category slug 
        // needed for the path: `/${categorySlug}/${postSlug}-${postId}`
        // For simplicity, we use a placeholder 'entertainment' category slug here.
        const categorySlug = 'entertainment'; 
        
        return {
            // URL format must match your page structure: /category/slug-id
            url: `${BASE_URL}/${categorySlug}/${post.slug}-${post.id}`,
            lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
            changeFrequency: 'hourly',
            priority: 0.8,
        };
    });

    // Combine all sitemap entries
    return [...staticPages, ...categoryLinks, ...postLinks];

}
