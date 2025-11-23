// app/[category]/page.tsx

import { ArticleCard, WPPost } from '@/components/ArticleCard';
import LoadMorePosts from '@/components/LoadMorePosts'; // 🎯 NEW: Import Client Component
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';

const API_URL = 'https://www.newsstate24.com/wp-json/wp/v2';
const POSTS_PER_PAGE = 10; // 🎯 Define constant for posts per page

// --- TYPE DEFINITIONS ---
interface CategorySlug {
  slug: string;
}
// 🎯 Added Type for Category Data for better safety
interface CategoryData { 
    id: number;
    name: string;
    slug: string;
    count: number; // Important for knowing if there are more posts!
    // ... other WP category properties
}


// 1. Function to find the Category ID by its slug
async function getCategoryData(slug: string): Promise<CategoryData | null> { // 🎯 Added return type
    try {
        const res = await fetch(`${API_URL}/categories?slug=${slug}`);
        if (!res.ok) {
            return null;
        }
        const categories: CategoryData[] = await res.json(); // Cast to CategoryData array
        // Return the first category object found
        return categories.length > 0 ? categories[0] : null;

    } catch (error) {
        console.error('Error fetching category data:', error);
        return null;
    }
}

// 2. Function to fetch posts belonging to a specific Category ID
// 🎯 Replaced getCategoryPosts with a general fetch function
// This function will be called by both Server Component (initial load) and Client Component (load more)
export async function fetchPosts(categoryId: number, page: number = 1): Promise<WPPost[]> {
    try {
        // Calculate offset (page 1 is offset 0, page 2 is offset 10, etc.)
        const offset = (page - 1) * POSTS_PER_PAGE;

        // Fetch posts filtered by category ID, embedding details, and using offset
        // Using 'offset' is often necessary if 'page' is not reliable/available in simple WP REST queries.
        // However, standard WP REST API uses the 'page' parameter. Let's use 'page'.
        const res = await fetch(
            `${API_URL}/posts?_embed&categories=${categoryId}&per_page=${POSTS_PER_PAGE}&page=${page}`, 
            {
                // Use ISR to keep the listing relatively fresh
                // Only for the initial load done by the server component.
                next: { revalidate: 120 }, 
            }
        );

        if (!res.ok) {
            return [];
        }
        
        // 🎯 Note: We can't easily get the X-WP-TotalPages header here in the server component for the client component to use for limiting the button, so we'll rely on checking if the returned array is less than POSTS_PER_PAGE in the client component.
        return res.json() as Promise<WPPost[]>; 
        
    } catch (error) {
        console.error('Error fetching category posts:', error);
        return [];
    }
}


export default async function CategoryPage({ params }: { params: { category: string } }) {
    const categorySlug = params.category;

    // Step 1: Get category details (ID, Name, Count)
    const category = await getCategoryData(categorySlug);

    if (!category) {
        notFound();
    }

    // Step 2: Get the *first* page of posts using the category ID
    // 🎯 Use page 1 for initial load
    const initialPosts = await fetchPosts(category.id, 1);

    return (
        <section>
            {/* Category Name as Main Heading */}
            <h1 className="text-4xl font-extrabold mb-6 border-b pb-2 text-red-700">
                {parse(category.name)}
            </h1>
            
            {initialPosts.length === 0 && category.count === 0 ? (
                <p className="text-lg text-gray-600">
                    इस कैटेगरी (**{parse(category.name)}**) में फ़िलहाल कोई पोस्ट उपलब्ध नहीं है।
                </p>
            ) : (
                // 🎯 Pass initial posts, category ID, and total count to the client component
                <LoadMorePosts 
                    initialPosts={initialPosts}
                    categoryId={category.id}
                    totalPostCount={category.count} // Use category count to determine if more pages exist
                    categoryName={parse(category.name)} // Pass name for display in case of no posts
                />
            )}
        </section>
    );
}

// Optional: Generate static paths for popular categories (SSG)
export async function generateStaticParams() {
    try {
        const res = await fetch(`${API_URL}/categories?per_page=10`);
        
        const categories: CategorySlug[] = await res.json();
        
        return categories.map((category) => ({
            category: category.slug,
        }));
    } catch (error) {
        console.warn('Could not generate static category paths. Pages will be generated on demand.');
        return [];
    }
}