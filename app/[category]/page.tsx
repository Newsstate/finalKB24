// app/[category]/page.tsx
import { ArticleCard } from '@/components/ArticleCard';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';

// Types for WP category + post
type WPCategory = {
    id: number;
    name: string;
    slug: string;
};

type WPPost = {
    id: number;
    date: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    slug: string;
    _embedded: {
        author?: any[];
        'wp:featuredmedia'?: any[];
        [key: string]: any;
    };
};

// 1. Function to find the Category ID by its slug
async function getCategoryData(slug: string): Promise<WPCategory | null> {
    try {
        const res = await fetch(`${API_URL}/categories?slug=${slug}`);
        if (!res.ok) {
            return null;
        }
        const categories = await res.json();
        return categories.length > 0 ? categories[0] : null;

    } catch (error) {
        console.error('Error fetching category data:', error);
        return null;
    }
}

// 2. Function to fetch posts belonging to a specific Category ID
async function getCategoryPosts(categoryId: number): Promise<WPPost[]> {
    try {
        const res = await fetch(
            `${API_URL}/posts?_embed&categories=${categoryId}&per_page=10`,
            {
                next: { revalidate: 120 }, // ISR
            }
        );

        if (!res.ok) {
            return [];
        }

        const posts: WPPost[] = await res.json();
        return posts;

    } catch (error) {
        console.error('Error fetching category posts:', error);
        return [];
    }
}

export default async function CategoryPage({
    params,
}: {
    params: { category: string };
}) {
    const categorySlug = params.category;

    // Step 1: Get category details
    const category = await getCategoryData(categorySlug);

    if (!category) {
        notFound();
    }

    // Step 2: Get posts
    const posts = await getCategoryPosts(category.id);

    return (
        <section>
            {/* Category Name */}
            <h1 className="text-4xl font-extrabold mb-6 border-b pb-2 text-red-700">
                {parse(category.name)}
            </h1>

            {posts.length === 0 ? (
                <p className="text-lg text-gray-600">
                    इस कैटेगरी (**{parse(category.name)}**) में फ़िलहाल कोई पोस्ट उपलब्ध नहीं है।
                </p>
            ) : (
                <div className="space-y-6">
                    {posts.map((post: WPPost) => (
                        <ArticleCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </section>
    );
}

// Optional: Generate static paths for popular categories (SSG)
export async function generateStaticParams() {
    try {
        const res = await fetch(`${API_URL}/categories?per_page=10`);
        const categories: WPCategory[] = await res.json();

        return categories.map((category) => ({
            category: category.slug,
        }));
    } catch (error) {
        console.warn('Could not generate static category paths. Pages will be generated on demand.');
        return [];
    }
}
