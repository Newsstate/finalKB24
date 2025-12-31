// app/[category]/[slugAndId]/amp/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = "https://khabar24live.com/wp-json/wp/v2";
const BASE_URL = "https://www.newsstate24.com";

// Categories for navigation
const categories = [
  { slug: 'entertainment', name: 'मनोरंजन' },
  { slug: 'latest', name: 'तजा खबर' },
  { slug: 'bihar', name: 'बिहार' },
  { slug: 'uttar-pradesh', name: 'उत्तर प्रदेश' },
  { slug: 'madhya-pradesh', name: 'मध्य प्रदेश' },
  { slug: 'rajasthan', name: 'राजस्थान' },
  { slug: 'uttarakhand', name: 'उत्तराखंड' },
  { slug: 'jharkhand', name: 'झारखण्ड' },
  { slug: 'chhattisgarh', name: 'छत्तीसगढ़ न्यूज़' },
  { slug: 'delhi-ncr', name: 'दिल्ली' },
  { slug: 'sports', name: 'खेल' },
  { slug: 'business', name: 'करोबार' },
  { slug: 'share-market', name: 'शेयर बाजार' },
  { slug: 'technology', name: 'टेक' },
  { slug: 'religion', name: 'धर्म' },
  { slug: 'horoscope', name: 'राशिफल' },
  { slug: 'panchang', name: 'पंचांग' },
  { slug: 'chalisa-aarti', name: 'चालीसा' },
  { slug: 'lifestyle', name: 'लाइफस्टाइल' },
];


/** Extract slug from "title-12345" */
function extractSlug(slugAndId: string) {
  const parts = slugAndId.split("-");
  return parts.slice(0, -1).join("-");
}

/** Fetch post by slug */
async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const posts = await res.json();
  return posts.length ? posts[0] : null;
}

/** Sanitize content for AMP */
function transformContentToAmp(html: string) {
  if (!html) return "";

  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/\son\w+="[^"]*"/gi, "");
  html = html.replace(/\son\w+='[^']*'/gi, "");
  html = html.replace(/\son\w+=\S+/gi, "");

  html = html.replace(/<iframe[\s\S]*?<\/iframe>/gi, (m) => {
    const srcMatch = m.match(/src\s*=\s*"(.*?)"/i) || m.match(/src\s*=\s*'(.*?)'/i);
    const src = srcMatch ? srcMatch[1] : "";
    if (!src) return "";
    return `<p><a href="${src}" target="_blank" rel="noopener">View embedded content</a></p>`;
  });

  html = html.replace(/<img\b([^>]*?)>/gi, (match, attrs) => {
    const srcMatch = attrs.match(/src\s*=\s*"(.*?)"/i) || attrs.match(/src\s*=\s*'(.*?)'/i);
    const src = srcMatch ? srcMatch[1] : "";
    if (!src) return "";

    const altMatch = attrs.match(/alt\s*=\s*"(.*?)"/i) || attrs.match(/alt\s*=\s*'(.*?)'/i);
    const alt = altMatch ? altMatch[1] : "";

    const widthMatch = attrs.match(/width\s*=\s*"(.*?)"/i) || attrs.match(/width\s*=\s*'(.*?)'/i);
    const heightMatch = attrs.match(/height\s*=\s*"(.*?)"/i) || attrs.match(/height\s*=\s*'(.*?)'/i);

    let width = widthMatch ? widthMatch[1] : "800";
    let height = heightMatch ? heightMatch[1] : "450";

    const finalSrc = src.startsWith("http") ? src : src.startsWith("/") ? `${BASE_URL}${src}` : src;

    return `<amp-img src="${finalSrc}" alt="${escapeHtml(alt)}" width="${width}" height="${height}" layout="responsive"></amp-img>`;
  });

  html = html.replace(/<link[^>]*rel=["']preload["'][^>]*>/gi, "");
  return html;
}

function escapeHtml(str: string) {
  return String(str || "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** GET handler */
export async function GET(request: NextRequest, { params }: { params: { category: string; slugAndId: string } }) {
  try {
    const slugAndId = params.slugAndId;
    const category = params.category;
    const slug = extractSlug(slugAndId);

    const post = await fetchPostBySlug(slug);
    if (!post) return new NextResponse("Not found", { status: 404 });

    const title = post.title?.rendered || "";
    const rawContent = post.content?.rendered || "";
    const transformedContent = transformContentToAmp(rawContent);
    const date = post.date || "";
    const authorName = post._embedded?.author?.[0]?.name || "Newsstate24 Desk";
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const imageUrl = featuredMedia?.source_url ? (featuredMedia.source_url.startsWith("http") ? featuredMedia.source_url : `${BASE_URL}${featuredMedia.source_url}`) : "";
    const imageAlt = featuredMedia?.alt_text || title;

    const canonical = `${BASE_URL}/${category}/${slugAndId}`;
    const seoDescription = escapeHtml(post.yoast_head_json?.description || post.excerpt?.rendered || title);

    // AMP summary/excerpt
    const summary = post.excerpt?.rendered ? `<p class="excerpt">${post.excerpt.rendered}</p>` : "";

    // Build horizontal navigation
    const navHtml = `<nav style="overflow-x:auto;white-space:nowrap;margin-bottom:16px;">
      ${categories.map(c => `<a href="${BASE_URL}/${c.slug}" style="display:inline-block;margin-right:12px;color:#cc0000;text-decoration:none;">${c.name}</a>`).join("")}
    </nav>`;

    const html = `<!doctype html>
<html ⚡ lang="hi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta name="robots" content="index, follow">
  <meta name="description" content="${seoDescription}">
  <link rel="canonical" href="${canonical}">
  <title>${escapeHtml(title)}</title>
  <script async src="https://cdn.ampproject.org/v0.js"></script>

  <style amp-boilerplate>
  body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
       -moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
       -ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
       animation:-amp-start 8s steps(1,end) 0s 1 normal both}
  @-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  @-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  @-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  @-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  @keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  </style>
  <noscript>
    <style amp-boilerplate>
      body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
    </style>
  </noscript>

  <style amp-custom>
    body{font-family: system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial; background:#fff;color:#111;margin:0;padding:12px;}
    .container{max-width:700px;margin:0 auto;}
    header{background:#cc0000;color:#fff;padding:12px;text-align:center;border-radius:6px;}
    h1{font-size:28px;line-height:1.2;margin:16px 0;}
    .meta{color:#666;font-size:0.9rem;margin-bottom:14px;}
    .excerpt{font-style:italic;border-left:4px solid #cc0000;padding-left:12px;margin-bottom:12px;color:#444;}
    .content p{margin:0 0 1rem 0;line-height:1.65;font-size:1rem;}
    .content ul{margin:0 0 1rem 1.25rem;}
    .content ol{margin:0 0 1rem 1.25rem;}
    footer{border-top:1px solid #eee;margin-top:20px;padding-top:12px;color:#666;font-size:0.85rem;text-align:center;}
    a{color:#cc0000}
    amp-img{border-radius:8px;display:block;margin:0 0 1rem 0;}
  </style>
</head>
<body>
  <div class="container">
    <header><h2 style="margin:0;font-size:1.25rem">Newsstate24</h2></header>

    ${navHtml}

    <article>
      <h1>${escapeHtml(title)}</h1>
      <div class="meta">By ${escapeHtml(authorName)} | ${escapeHtml(date)}</div>

      ${summary}
      ${imageUrl ? `<amp-img src="${imageUrl}" alt="${escapeHtml(imageAlt)}" width="800" height="450" layout="responsive"></amp-img>` : ""}

      <div class="content">
        ${transformedContent}
      </div>
    </article>

    <footer>
      <p><a href="${canonical}">View full article</a></p>
      <p>&copy; ${new Date().getFullYear()} Newsstate24</p>
    </footer>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    console.error("AMP route error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
