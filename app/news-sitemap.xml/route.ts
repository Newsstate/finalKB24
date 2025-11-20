// app/news-sitemap.xml/route.ts

import { NextResponse } from 'next/server';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
const BASE_URL = 'https://www.khabar24live.com'; // Use your actual base URL

interface WpNewsPost {
    id: number;
    slug: string;
    date: string; // ISO 8601 format
    title: { rendered: string };
    _embedded: {
        'wp:term'?: [[{ slug: string; name: string }]];
    };
}

// Custom fetch to get the latest 1000 posts
async function getRecentNewsPosts(): Promise<WpNewsPost[]> {
    try {
        // Fetch posts from the last 48 hours is ideal, but WP API requires a date filter.
        // For simplicity, we fetch the latest 1000 posts and filter by date.
        const res = await fetch(`${API_URL}/posts?_embed&per_page=1000&orderby=date&order=desc`, {
            // Revalidate frequently (e.g., every 5 minutes) as news updates fast
            next: { revalidate: 300 }, 
        });
        if (!res.ok) { return []; }
        return res.json();
    } catch (error) {
        console.error('Error fetching news posts:', error);
        return [];
    }
}

function generateNewsSitemapXml(posts: WpNewsPost[]): string {
    const today = new Date();
    // Filter posts published in the last 48 hours (48 * 60 * 60 * 1000 milliseconds)
    const recentPosts = posts.filter(post => {
        const postDate = new Date(post.date);
        return today.getTime() - postDate.getTime() <= 48 * 60 * 60 * 1000;
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

    recentPosts.forEach(post => {
        const categorySlug = post._embedded['wp:term']?.[0]?.[0]?.slug || 'latest';
        const articlePath = `${BASE_URL}/${categorySlug}/${post.slug}-${post.id}`;
        const title = post.title.rendered.replace(/<[^>]*>?/gm, '');
        const publicationDate = post.date.substring(0, 10); // YYYY-MM-DD

        xml += `  <url>\n`;
        xml += `    <loc>${articlePath}</loc>\n`;
        xml += `    <news:news>\n`;
        xml += `      <news:publication>\n`;
        xml += `        <news:name>Khabar24Live</news:name>\n`; // Your Publication Name
        xml += `        <news:language>hi</news:language>\n`; // Hindi Language Code
        xml += `      </news:publication>\n`;
        xml += `      <news:publication_date>${publicationDate}</news:publication_date>\n`;
        xml += `      <news:title>${title}</news:title>\n`;
        // Optional: Add keywords if available (e.g., from WordPress tags)
        // xml += `      <news:keywords>...</news:keywords>\n`; 
        xml += `    </news:news>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
}

export async function GET() {
    const posts = await getRecentNewsPosts();
    const xml = generateNewsSitemapXml(posts);

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}