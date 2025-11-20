// app/[category]/[slugAndId]/amp/route.ts

import { NextResponse } from "next/server";

const API_URL = "https://khabar24live.com/wp-json/wp/v2";
const BASE_URL = "https://www.khabar24live.com";

// Extract slug from slug-ID (example: "example-post-12345")
function extractSlug(slugAndId: string) {
  const parts = slugAndId.split("-");
  return parts.slice(0, -1).join("-");
}

export async function GET(
  req: Request,
  context: { params: { category: string; slugAndId: string } }
) {
  const { category, slugAndId } = context.params;
  const slug = extractSlug(slugAndId);

  // Fetch Post
  const res = await fetch(`${API_URL}/posts?_embed&slug=${slug}`);
  const posts = await res.json();

  if (!posts?.length) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const post = posts[0];
  const title = post.title.rendered;
  const content = post.content.rendered;
  const description = post.yoast_head_json?.description || title;
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
  const altText = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || title;

  const canonicalUrl = `${BASE_URL}/${category}/${slugAndId}`;

  // RETURN PURE AMP HTML
  const ampHtml = `
<!DOCTYPE html>
<html ⚡ lang="hi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="index,follow" />

  <link rel="canonical" href="${canonicalUrl}" />

  <!-- AMP RUNTIME -->
  <script async src="https://cdn.ampproject.org/v0.js"></script>

  <!-- AMP COMPONENTS -->
  <script async custom-element="amp-img"
    src="https://cdn.ampproject.org/v0/amp-img-0.1.js"></script>

  <!-- AMP BOILERPLATE -->
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

  <!-- CUSTOM STYLES -->
  <style amp-custom>
    body {
      font-family: Arial, sans-serif;
      padding: 16px;
      line-height: 1.8;
      background: #fff;
      color: #000;
    }
    article {
      background: #fff;
      padding: 16px;
      border-radius: 10px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      line-height: 2.9rem;
      margin: 20px 0;
    }
    h2 { font-size: 24px; font-weight: 700; margin: 20px 0 10px; }
    p { font-size: 18px; margin-bottom: 16px; }
    ul, ol { margin-left: 20px; margin-bottom: 20px; }
    li { margin-bottom: 10px; font-size: 18px; }
    .featured-img { margin-bottom: 20px; border-radius: 10px; }
  </style>
</head>

<body>
  <article>

    ${
      image
        ? `
    <amp-img class="featured-img" src="${image}"
        width="1200" height="675"
        layout="responsive" alt="${altText}">
    </amp-img>
    `
        : ""
    }

    <h1>${title}</h1>

    <div class="content">
      ${content}
    </div>

  </article>
</body>
</html>
`;

  return new Response(ampHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
    },
  });
}
