import { NextResponse } from "next/server";


const BASE_URL = "https://www.newsstate24.com";
const API_URL = "https://khabar24live.com/wp-json/wp/v2";

interface Category {
  id: number;
  slug: string;
}

export async function GET() {
  const res = await fetch(
    `${API_URL}/categories?_fields=slug&per_page=100`
  );

  if (!res.ok) {
    return new NextResponse("", { status: 500 });
  }

  const categories: Category[] = await res.json();

  const urls = categories
    .map(
      cat => `
  <url>
    <loc>${BASE_URL}/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
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
