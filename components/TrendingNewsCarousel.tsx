// components/TrendingNewsCarousel.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
const BASE_URL = 'https://www.khabar24live.com';

interface RelatedPostWithMedia {
    id: number;
    slug: string;
    title: { rendered: string };
    categories: number[];
    _embedded: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string; width: number; height: number; }>;
    };
}

interface TrendingNewsCarouselProps {
    currentPostId: number;
    categoryIds: number[];
    categorySlug: string; 
}

/**
 * Fetches up to 10 random posts from ANY category or date (excluding current), 
 * including featured media. (Least restrictive query for guaranteed visibility)
 */
async function getTrendingPostsWithMedia(currentPostId: number, categoryIds: number[]): Promise<RelatedPostWithMedia[]> {
  
  try {
    // URL is now the least restrictive possible (removed categories and date filters):
    const apiUrl = 
      `${API_URL}/posts?` + 
      `exclude=${currentPostId}` +
      `&per_page=10` + 
      `&orderby=rand` + 
      `&_fields=id,slug,title,categories,_links` + 
      `&_embed=wp:featuredmedia`; 

    const res = await fetch(
      apiUrl,
      { next: { revalidate: 600 } } 
    );
    
    if (!res.ok) {
        console.error("Failed to fetch trending posts with media:", res.status, res.statusText);
        return [];
    }
    const data = await res.json();
    return data as RelatedPostWithMedia[]; 
  } catch (error) {
    console.error("Error fetching trending posts with media:", error);
    return [];
  }
}

export async function TrendingNewsCarousel({ currentPostId, categoryIds, categorySlug }: TrendingNewsCarouselProps) {
    const posts = await getTrendingPostsWithMedia(currentPostId, categoryIds);

    if (posts.length === 0) return null;

    // A simple, scrollable container to mimic a carousel
    return (
        <div className="my-8">
            {/* Header section (Dark blue background, white text) */}
            <div className="bg-blue-900 text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-bold">संबंधित खबरें</h2>
            </div>

            {/* Scrollable Carousel Container */}
            <div className="relative bg-white p-4 overflow-hidden rounded-b-lg shadow-lg">
                <div 
                    id="carousel-container" 
                    // Crucial: flex, overflow-x-auto, and no-scrollbar (must be defined in globals.css)
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar space-x-4" 
                >
                    {posts.map(post => {
                        const titleText = post.title.rendered.replace(/<[^>]*>?/gm, '');
                        // NOTE: This link path assumes the categorySlug is correct for the random post
                        const postPath = `/${categorySlug}/${post.slug}-${post.id}`; 
                        const imageUrl = post._embedded['wp:featuredmedia']?.[0]?.source_url || `${BASE_URL}/placeholder.jpg`;
                        const imageAlt = post._embedded['wp:featuredmedia']?.[0]?.alt_text || titleText;

                        return (
                            <div key={post.id} className="flex-shrink-0 w-64 md:w-80 lg:w-96 snap-start">
                                <Link href={postPath} className="block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                                    <div className="relative w-full h-40">
                                        <Image
                                            src={imageUrl}
                                            alt={imageAlt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{ objectFit: "cover" }}
                                            className="transition-transform duration-300 hover:scale-105"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-base font-semibold text-gray-900 line-clamp-3">
                                            {titleText}
                                        </h3>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}