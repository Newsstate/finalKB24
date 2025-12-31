// app/[category]/[slugAndId]/page.tsx

import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { hi } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';
import parse from 'html-react-parser';

// 1. Import the components
import { TrendingNewsCarousel } from '@/components/TrendingNewsCarousel';
import { RichTextRenderer } from '@/components/RichTextRenderer';
import { Ad300x250 } from '@/components/Ad300x250';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
const BASE_URL = 'https://www.khabar24live.com';

// --- TYPE DEFINITIONS ---
interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  modified_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded: {
    author?: Array<{ name: string; avatar_urls?: { [key: number]: string } }>;
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string; width: number; height: number; }>;
  };
}

// ===========================================
// 🔥 HELPER FUNCTIONS 
// ===========================================

const extractSlug = (slugAndId: string) => {
  if (!slugAndId) return '';
  const parts = slugAndId.split('-');
  return parts.slice(0, -1).join('-');
};

async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${API_URL}/posts?_embed&slug=${slug}`, { 
      next: { revalidate: 1800 },
    });

    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    return posts.length > 0 ? posts[0] : null;

  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

function getNewsArticleSchema(post: WPPost, articleUrl: string, titleText: string, descriptionText: string) {
    const featuredMedia = post._embedded['wp:featuredmedia']?.[0];
    const author = post._embedded.author?.[0];

    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl
        },
        "headline": titleText,
        "image": {
            "@type": "ImageObject",
            "url": featuredMedia?.source_url || `${BASE_URL}/placeholder.jpg`,
            "width": featuredMedia?.width || 1200,
            "height": featuredMedia?.height || 675
        },
        "datePublished": post.date,
        "dateModified": post.modified_gmt || post.date,
        "author": {
            "@type": "Person",
            "name": author?.name || "Khabar24Live Desk",
        },
        "publisher": {
            "@type": "Organization",
            "name": "Khabar24Live",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.khabar24live.com/wp-content/uploads/2025/09/khabar24live-300x300-1.jpg", 
                "width": 600,
                "height": 60
            }
        },
        "description": descriptionText,
        "articleBody": post.content.rendered.replace(/<[^>]*>?/gm, ' ')
    });
}

function getBreadcrumbSchema(categoryName: string, categorySlug: string, articleTitle: string, articleUrl: string) {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "होम",
                "item": BASE_URL + "/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": categoryName,
                "item": `${BASE_URL}/${categorySlug}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": articleTitle,
                "item": articleUrl
            }
        ]
    });
}

// =========================
// SEO + Metadata Block (FIXED)
// =========================
export async function generateMetadata({ params }: { params: { slugAndId: string, category: string } }): Promise<Metadata> {
  
  if (!params.slugAndId) {
    return { title: 'Not Found | Missing Slug' };
  }
    
  const postSlug = extractSlug(params.slugAndId);
  const post = await getPost(postSlug);
  
  if (!post) {
    return { title: 'Not Found' };
  }

  const articlePath = `/${params.category}/${params.slugAndId}`;
  const title = post.title.rendered.replace(/<[^>]*>?/gm, '');
  const description = post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
  
  const ampUrl = `${BASE_URL}${articlePath}/amp`; 
  const canonicalUrl = `${BASE_URL}${articlePath}`; 

  return {
    title: title,
    description: description,
    
    // ✅ FIXED: Using 'alternates' to handle both Canonical and AMP links
    alternates: { 
        canonical: canonicalUrl,
        other: {
            amphtml: ampUrl,
        },
    },

    openGraph: {
        title: title,
        description: description,
        url: canonicalUrl,
        type: 'article',
        images: [
            {
                url: post._embedded['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg',
                alt: title,
            },
        ],
        publishedTime: post.date,
        modifiedTime: post.modified_gmt || post.date,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
        },
    },
  };
}

// =========================
// Main Article Page
// =========================
export default async function PostPage({ params }: { params: { category: string; slugAndId: string } }) {
  const postSlug = extractSlug(params.slugAndId);
  const post = await getPost(postSlug);

  if (!post) notFound();

  const title = post.title.rendered;
  const content = post.content.rendered;
  const date = post.date;
  
  const titleText = title.replace(/<[^>]*>?/gm, '');
  const descriptionText = post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
  const articlePath = `/${params.category}/${params.slugAndId}`;
  const articleUrl = `${BASE_URL}${articlePath}`;
  const categorySlug = params.category;
  const categoryName =
    params.category.charAt(0).toUpperCase() +
    params.category.slice(1).replace(/-/g, " ");
  const postTitleText = titleText; 

  const newsArticleSchema = getNewsArticleSchema(post, articleUrl, titleText, descriptionText);
  const breadcrumbSchema = getBreadcrumbSchema(categoryName, categorySlug, postTitleText, articleUrl);

  const authorName = post._embedded.author?.[0]?.name || "Khabar24Live Desk";
  const authorAvatarUrl = post._embedded.author?.[0]?.avatar_urls?.[96] || "/default-avatar.png";

  const featuredMedia = post._embedded["wp:featuredmedia"]?.[0];
  const imageUrl = featuredMedia?.source_url || "/placeholder-large.jpg";
  const imageAlt = featuredMedia?.alt_text || title;

  const formattedDate = format(parseISO(date), "dd MMMM yyyy, hh:mm a", {
    locale: hi,
  });

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: newsArticleSchema }}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      
      <article className="bg-white p-2 rounded-lg shadow-lg text-black">
        
        <nav 
          className="flex text-sm text-gray-500 mb-2 overflow-x-auto whitespace-nowrap" 
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link 
                href="/" 
                className="text-gray-500 hover:text-red-700 font-medium"
              >
                होम
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link 
                  href={`/${params.category}`}
                  className="text-red-700 hover:text-red-800 font-medium capitalize flex-shrink-0"
                >
                  {categoryName}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="text-gray-900 line-clamp-1 max-w-xs"> 
                  {postTitleText}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <h1
          className="text-4xl font-extrabold mt-2 mb-4 text-gray-900"
          style={{ lineHeight: "2.9rem" }}
        >
          {parse(title)}
        </h1>

        <div className="flex items-center text-sm text-gray-500 mb-6 border-b pb-4">
          <Image
            src={authorAvatarUrl}
            alt={authorName}
            width={32}
            height={32}
            className="rounded-full mr-3"
            unoptimized
          />
          <span>
            By {authorName} | Published: {formattedDate}
          </span>
        </div>

        {post.excerpt.rendered && (
          <div className="text-lg font-semibold italic text-gray-700 mb-6 border-l-4 border-red-500 pl-4">
            {parse(post.excerpt.rendered)}
          </div>
        )}

        <div className="relative w-full aspect-video mb-6">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="rounded-xl"
            unoptimized
          />
        </div>

        <div className="prose max-w-none text-lg leading-relaxed text-black custom-article-body">
        <RichTextRenderer 
            htmlContent={content}
            insertAfterParagraph={2} 
            insertionComponent={<Ad300x250 />}
          />
        </div>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  return [
    { 
      category: "entertainment",
      slugAndId:
        "its-confirmed-korean-action-star-don-lee-joins-prabhas-triptii-dimri-spirit-directed-by-sandeep-reddy-vanga-53175"
    },
  ];
}