// app/[category]/[slugAndId]/amp/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = "https://khabar24live.com/wp-json/wp/v2";
const BASE_URL = "https://www.khabar24live.com";

/**
 * Basic helper: extract slug from "title-12345"
 */
function extractSlug(slugAndId: string) {
  const parts = slugAndId.split("-");
  return parts.slice(0, -1).join("-");
}

/**
 * Fetch post by slug (same logic as your page)
 */
async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const posts = await res.json();
  return posts.length ? posts[0] : null;
}

/**
 * Sanitize and transform content for AMP:
 * - remove <script> tags
 * - remove inline event handlers (onclick, onload, etc)
 * - convert <img> -> <amp-img layout="responsive" width="800" height="450">
 * - remove <iframe> (or replace with a safe placeholder)
 * NOTE: This is simple string-based transformation; if you need perfect HTML parsing,
 * use a server-side HTML parser (cheerio) and then map nodes carefully.
 */
function transformContentToAmp(html: string) {
  if (!html) return "";

  // 1. Remove script/style tags completely
  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");

  // 2. Remove inline event handlers like onclick, onerror, onmouseover etc.
  html = html.replace(/\son\w+="[^"]*"/gi, "");
  html = html.replace(/\son\w+='[^']*'/gi, "");
  html = html.replace(/\son\w+=\S+/gi, "");

  // 3. Replace <iframe ...> with a simple link placeholder (AMP requires <amp-iframe> with sandbox and sizes)
  html = html.replace(/<iframe[\s\S]*?<\/iframe>/gi, (m) => {
    // try to extract src
    const srcMatch = m.match(/src\s*=\s*"(.*?)"/i) || m.match(/src\s*=\s*'(.*?)'/i);
    const src = srcMatch ? srcMatch[1] : "";
    if (!src) return ""; // drop
    return `<p><a href="${src}" target="_blank" rel="noopener">View embedded content</a></p>`;
  });

  // 4. Convert <img> tags to <amp-img>. We add layout="responsive" and fallback width/height.
  //    Attempt to keep width/height if present; fallback to 800x450.
  html = html.replace(/<img\b([^>]*?)>/gi, (match, attrs) => {
    // Extract src, width, height, alt
    const srcMatch = attrs.match(/src\s*=\s*"(.*?)"/i) || attrs.match(/src\s*=\s*'(.*?)'/i);
    const src = srcMatch ? srcMatch[1] : "";

    if (!src) return "";

    const altMatch = attrs.match(/alt\s*=\s*"(.*?)"/i) || attrs.match(/alt\s*=\s*'(.*?)'/i);
    const alt = altMatch ? altMatch[1] : "";

    const widthMatch = attrs.match(/width\s*=\s*"(.*?)"/i) || attrs.match(/width\s*=\s*'(.*?)'/i);
    const heightMatch = attrs.match(/height\s*=\s*"(.*?)"/i) || attrs.match(/height\s*=\s*'(.*?)'/i);

    let width = widthMatch ? widthMatch[1] : null;
    let height = heightMatch ? heightMatch[1] : null;

    // If width/height are not numbers, fallback
    if (!width || isNaN(Number(width))) width = "800";
    if (!height || isNaN(Number(height))) height = "450";

    // Ensure src is absolute (if WP returns relative, make absolute)
    const finalSrc = src.startsWith("http") ? src : src.startsWith("/") ? `${BASE_URL}${src}` : src;

    // Build amp-img element
    return `<amp-img src="${finalSrc}" alt="${escapeHtml(alt)}" width="${width}" height="${height}" layout="responsive"></amp-img>`;
  });

  // 5. Remove link preloads or other tags that might sneak in (optional)
  html = html.replace(/<link[^>]*rel=["']preload["'][^>]*>/gi, "");

  // 6. Return transformed HTML
  return html;
}

/** small utility to escape quotes for attribute insertion */
function escapeHtml(str: string) {
  return String(str || "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * GET handler
 */
export async function GET(request: NextRequest, { params }: { params: { category: string; slugAndId: string } }) {
  try {
    const slugAndId = params.slugAndId;
    const category = params.category;
    const slug = extractSlug(slugAndId);

    const post = await fetchPostBySlug(slug);
    if (!post) {
      return new NextResponse("Not found", { status: 404 });
    }

    const title = post.title?.rendered || "";
    const rawContent = post.content?.rendered || "";
    const transformedContent = transformContentToAmp(rawContent);
    const date = post.date || "";
    const authorName = post._embedded?.author?.[0]?.name || "Khabar24Live Desk";
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const imageUrl = featuredMedia?.source_url ? (featuredMedia.source_url.startsWith("http") ? featuredMedia.source_url : `${BASE_URL}${featuredMedia.source_url}`) : "";
    const imageAlt = featuredMedia?.alt_text || title;

    // Canonical (must include category)
    const canonical = `${BASE_URL}/${category}/${slugAndId}`;

    // Build AMP HTML
    const html = `<!doctype html>
<html ⚡ lang="hi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="canonical" href="${canonical}">
  <title>${escapeHtml(title)}</title>

  <!-- AMP runtime -->
  <script async src="https://cdn.ampproject.org/v0.js"></script>

  <!-- Optional: amp-carousel or other components if you will use them -->
  <!-- <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script> -->

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
    /* IMPORTANT: keep inline CSS < 75KB */
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
    <header><h2 style="margin:0;font-size:1.25rem">Khabar24Live</h2></header>

    <article>
      <h1>${escapeHtml(title)}</h1>
      <div class="meta">By ${escapeHtml(authorName)} | ${escapeHtml(date)}</div>

      ${imageUrl ? `<amp-img src="${imageUrl}" alt="${escapeHtml(imageAlt)}" width="800" height="450" layout="responsive"></amp-img>` : ""}

      <div class="content">
        ${transformedContent}
      </div>
    </article>

    <footer>
      <p><a href="${canonical}">View full article</a></p>
      <p>&copy; ${new Date().getFullYear()} Khabar24Live</p>
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
