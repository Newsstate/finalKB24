// app/news-sitemap/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://www.khabar24live.com';
const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
const PUBLICATION_NAME = 'Khabar 24 Live'; // MUST be your publication's name
const PUBLICATION_LANGUAGE = 'hi'; // Hindi (hi)

// --- Type Definition for News Data ---
interface NewsPost {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    // Assuming the category slug is needed for the URL structure
    categories: number[]; 
}

// --- News Data Fetching ---
async function getLatestNewsPosts(): Promise<NewsPost[]> {
    try {
        // Fetch only the most recent 100 articles, which is typically sufficient for a News Sitemap
        // Google only indexes news articles from the last 48 hours for the News Sitemap
        const res = await fetch(`${API_URL}/posts?_fields=id,slug,date,title,categories&per_page=100`);
        if (!res.ok) return [];
        
        const posts = await res.json();
        return posts;
    } catch (error) {
        console.error("News Sitemap: Failed to fetch posts:", error);
        return [];
    }
}

// --- XML Generation ---

/**
 * Creates the XML content for the Google News Sitemap.
 */
function generateNewsSitemapXml(posts: NewsPost[]): string {
    const today = new Date().toISOString().split('T')[0];

    // XML header for Google News Sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

    posts.forEach(post => {
        // Clean and format data
        const articleTitle = post.title.rendered.replace(/<[^>]*>?/gm, '').replace(/&/g, '&amp;');
        const categorySlug = 'entertainment'; // Placeholder: needs to be resolved from post.categories
        const postUrl = `${BASE_URL}/${categorySlug}/${post.slug}-${post.id}`;
        const publicationDate = post.date.substring(0, 19) + '+00:00'; // ISO 8601 format

        // Append URL entry with news specific tags
        xml += `
<url>
    <loc>${postUrl}</loc>
    <news:news>
        <news:publication>
            <news:name>${PUBLICATION_NAME}</news:name>
            <news:language>${PUBLICATION_LANGUAGE}</news:language>
        </news:publication>
        <news:publication_date>${publicationDate}</news:publication_date>
        <news:title>${articleTitle}</news:title>
    </news:news>
</url>`;
    });

    xml += `
</urlset>`;
    return xml;
}

// --- Next.js Route Handler ---

export async function GET(request: NextRequest) {
    const posts = await getLatestNewsPosts();
    const xml = generateNewsSitemapXml(posts);

    // Return the response with the correct XML headers
    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=600, must-revalidate' // Cache for 10 minutes
        },
    });
}