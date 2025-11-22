// app/[category]/page.tsx
import { ArticleCard, WPPost } from '@/components/ArticleCard'; // ✅ IMPORT WPPost
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';

// 1. Function to find the Category ID by its slug
async function getCategoryData(slug: string) {
    try {
        const res = await fetch(`${API_URL}/categories?slug=${slug}`);
        if (!res.ok) {
            return null;
        }
        const categories = await res.json();
        // Return the first category object found
        return categories.length > 0 ? categories[0] : null;

    } catch (error) {
        console.error('Error fetching category data:', error);
        return null;
    }
}

// 2. Function to fetch posts belonging to a specific Category ID
// 🎯 Added return type annotation for clarity and safety
async function getCategoryPosts(categoryId: number): Promise<WPPost[]> {
    try {
        // Fetch posts filtered by category ID, embedding details
        const res = await fetch(`${API_URL}/posts?_embed&categories=${categoryId}&per_page=10`, {
            // Use ISR to keep the listing relatively fresh
            next: { revalidate: 120 }, 
        });

        if (!res.ok) {
            return [];
        }
        return res.json() as Promise<WPPost[]>; // Cast to the correct type
        
    } catch (error) {
        console.error('Error fetching category posts:', error);
        return [];
    }
}


export default async function CategoryPage({ params }: { params: { category: string } }) {
    const categorySlug = params.category;

    // Step 1: Get category details (ID, Name)
    const category = await getCategoryData(categorySlug);

    if (!category) {
        // If the category slug doesn't exist, show Next.js 404 page
        notFound();
    }

    // Step 2: Get posts using the category ID
    // 🎯 The 'posts' variable is now correctly inferred as WPPost[] from the fetch function
    const posts = await getCategoryPosts(category.id);

    return (
        <section>
            {/* Category Name as Main Heading */}
            <h1 className="text-4xl font-extrabold mb-6 border-b pb-2 text-red-700">
                {/* Render category name safely */}
                {parse(category.name)}
            </h1>
            
            {posts.length === 0 ? (
                <p className="text-lg text-gray-600">
                    इस कैटेगरी (**{parse(category.name)}**) में फ़िलहाल कोई पोस्ट उपलब्ध नहीं है।
                </p>
            ) : (
                <div className="space-y-6">
                    {/* ✅ FIX: 'post' is now correctly typed because 'posts' is WPPost[] */}
                    {posts.map((post: WPPost) => ( 
                        // Reuse the ArticleCard component for consistent listing
                        <ArticleCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </section>
    );
}

// Optional: Generate static paths for popular categories (SSG)
export async function generateStaticParams() {
    // This fetches a list of categories to pre-render the category pages at build time.
    try {
        const res = await fetch(`${API_URL}/categories?per_page=10`);
        const categories = await res.json();
        
        return categories.map((category) => ({
            category: category.slug, // The dynamic part of the route
        }));
    } catch (error) {
        console.warn('Could not generate static category paths. Pages will be generated on demand.');
        return [];
    }
}