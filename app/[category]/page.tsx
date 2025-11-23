// app/[category]/page.tsx

import { ArticleCard, WPPost } from '@/components/ArticleCard';
import LoadMorePosts from '@/components/LoadMorePosts'; 
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import { fetchPosts as fetchPostsFromApi } from '@/lib/api'; // 🎯 NEW: Import fetcher from utility

const API_URL = 'https://www.newsstate24.com/wp-json/wp/v2';
const POSTS_PER_PAGE = 10; 

// --- TYPE DEFINITIONS ---
interface CategorySlug {
  slug: string;
}
interface CategoryData { 
    id: number;
    name: string;
    slug: string;
    count: number; 
}


// 1. Function to find the Category ID by its slug (No Change)
async function getCategoryData(slug: string): Promise<CategoryData | null> {
    try {
        const res = await fetch(`${API_URL}/categories?slug=${slug}`);
        if (!res.ok) {
            return null;
        }
        const categories: CategoryData[] = await res.json();
        return categories.length > 0 ? categories[0] : null;

    } catch (error) {
        console.error('Error fetching category data:', error);
        return null;
    }
}

// 2. Function for initial server fetch (Replaces old 'export function fetchPosts')
async function getInitialPosts(categoryId: number): Promise<WPPost[]> {
    try {
        // Server fetch includes the ISR option
        const res = await fetch(
            `${API_URL}/posts?_embed&categories=${categoryId}&per_page=${POSTS_PER_PAGE}&page=1`, 
            {
                next: { revalidate: 120 }, 
            }
        );

        if (!res.ok) {
            return [];
        }
        
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
    const initialPosts = await getInitialPosts(category.id); // 🎯 Use the dedicated server function

    return (
        <section>
            {/* Category Name as Main Heading */}
            <h1 className="text-4xl font-extrabold mb-6 border-b pb-2 text-red-700">
                {parse(category.name)}
            </h1>
            
            {/* The Client Component handles rendering and "Load More" logic */}
            <LoadMorePosts 
                initialPosts={initialPosts}
                categoryId={category.id}
                totalPostCount={category.count} 
                categoryName={parse(category.name)} 
                fetcher={fetchPostsFromApi} // 🎯 Pass the safe utility function
            />
        </section>
    );
}

// Optional: Generate static paths for popular categories (SSG) (No Change)
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