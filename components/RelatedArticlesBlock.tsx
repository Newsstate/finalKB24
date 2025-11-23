// components/RelatedArticlesBlock.tsx

import React from 'react';
import Link from 'next/link';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';

interface RelatedPostItem {
    id: number;
    slug: string;
    title: { rendered: string };
    categories: number[]; // Ensure this is fetched if needed for other logic
}

interface RelatedArticlesBlockProps {
    currentPostId: number;
    categoryIds: number[];
    categorySlug: string; // The slug of the current article's category
}

/**
 * Fetches up to 4 random posts that are NOT the current post, 
 * from the same category, and ensures they are NOT OLDER THAN 1 DAY.
 * ONLY FETCHES ID, SLUG, TITLE, CATEGORIES (for efficiency).
 */
async function getRecentRelatedPosts(currentPostId: number, categoryIds: number[]): Promise<RelatedPostItem[]> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('.')[0];
  const afterDateParam = encodeURIComponent(oneDayAgo);

  try {
    const apiUrl = 
      `${API_URL}/posts?categories=${categoryIds.join(',')}` +
      `&exclude=${currentPostId}` +
      `&per_page=4` +
      `&orderby=rand` +
      `&_fields=id,slug,title,categories` + 
      `&after=${afterDateParam}`; 

    const res = await fetch(
      apiUrl,
      { next: { revalidate: 600 } } 
    );
    
    if (!res.ok) {
        console.error("Failed to fetch related posts:", res.status, res.statusText);
        return [];
    }
    const data = await res.json();
    return data as RelatedPostItem[]; 
  } catch (error) {
    console.error("Error fetching recent related posts:", error);
    return [];
  }
}

export async function RelatedArticlesBlock({ currentPostId, categoryIds, categorySlug }: RelatedArticlesBlockProps) {
    const relatedPosts = await getRecentRelatedPosts(currentPostId, categoryIds);

    if (relatedPosts.length === 0) return null;

    return (
        <div className="bg-gray-100 p-4 rounded-lg my-6 border border-red-300">
            <p className="text-lg font-bold text-red-700 mb-3">
                <span className="inline-block mr-2 text-xl align-middle">🔥</span> 
                यह भी पढ़ें:
            </p>
            <ul className="space-y-2 list-disc list-inside ml-2">
                {relatedPosts.map(post => {
                    const titleText = post.title.rendered.replace(/<[^>]*>?/gm, '');
                    const postPath = `/${categorySlug}/${post.slug}-${post.id}`; 
                    return (
                        <li key={post.id}>
                            <Link 
                                href={postPath} 
                                className="text-gray-900 hover:text-red-700 font-medium text-base transition duration-150"
                            >
                                {titleText}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}