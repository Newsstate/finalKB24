import { NextResponse } from "next/server";


const BASE_URL = "https://www.newsstate24.com";
const API_URL = "https://khabar24live.com/wp-json/wp/v2";

interface Post {
  id: number;
  slug: string;
  date: string;
  modified: string;
  categories: number[];
}

interface Category {
  id: number;
  slug: string;
}

/* ---------- CATEGORY MAP ---------- */
async function getCategoryMap(): Promise<Map<number, string>> {
  const res = await fetch(
    `${API_URL}/categories?_fields=id,slug&per_page=100`
  );
  if (!res.ok) return new Map();

  const data: Category[] = await res.json();
  return new Map(data.map(c => [c.id, c.slug]));
}

/* ---------- ALL POSTS (PAGINATION) ---------- */
async function getAllPosts(): Promise<Post[]> {
  let page = 1;
  let posts: Post[] = [];

  while (true) {
    const res = await fetch(
      `${API_URL}/posts?_fields=id,slug,date,modified,categories&per_page=100&page=${page}`
    );
    if (!res.ok) break;

    const data: Post[] = await res.json();
    if (data.length === 0) break;

    posts.push(...data);
    page++;
  }

  return posts;
}

/* ---------- ROUTE ---------- */
export async function GET() {
  const categoryMap = await getCategoryMap();
  const posts = await getAllPosts();

  const urls = posts
    .map(post => {
      const catSlug =
        categoryMap.get(post.categories?.[0]) || "news";

      return `
  <url>
    <loc>${BASE_URL}/${catSlug}/${post.slug}-${post.id}</loc>
    <lastmod>${new Date(post.modified || post.date).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
