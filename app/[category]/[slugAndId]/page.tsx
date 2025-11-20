// app/[category]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
const BASE_URL = 'https://www.khabar24live.com';

// --- 1. DEFINING TYPESCRIPT INTERFACES ---

/**
 * Interface representing the basic structure of a WordPress Post object.
 * We include the fields necessary for display and linking.
 * You should expand this based on what 'ArticleCard' actually uses.
 */
interface Post {
    id: number;
    slug: string; // Add slug for linking
    date: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: [{ source_url: string; alt_text: string }];
        author?: [{ name: string }];
    };
}

/**
 * MOCK: A minimal ArticleCard component for demonstration.
 * In your real app, this would be imported from a separate file.
 */
const ArticleCard: React.FC<{ post: Post; categorySlug: string }> = ({ post, categorySlug }) => {
    const title = post.title.rendered.replace(/<[^>]*>?/gm, '');
    const excerpt = post.excerpt.rendered.replace(/<[^>]*>?/gm, '');
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';
    const postPath = `/${categorySlug}/${post.slug}-${post.id}`;

    return (
        <Link href={postPath} className="block p-4 sm:p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition shadow-md border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-full sm:w-48 h-32 relative">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                        unoptimized
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{title}</h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: excerpt }} />
                    <span className="text-xs text-red-600 font-semibold mt-3 block">Read More &rarr;</span>
                </div>
            </div>
        </Link>
    );
};


// --- DATA FETCHING ---

/**
 * Fetches posts for a given category slug.
 * IMPORTANT: It should return Post[] type.
 */
async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    // 1. Get the category ID first (assuming the slug needs to be mapped to an ID)
    const catRes = await fetch(`${API_URL}/categories?slug=${categorySlug}`, {
        next: { revalidate: 3600 } // Cache categories for 1 hour
    });
    const categories = await catRes.json();
    if (categories.length === 0) return [];
    const categoryId = categories[0].id;

    // 2. Fetch posts by category ID
    const postsRes = await fetch(`${API_URL}/posts?categories=${categoryId}&_embed&per_page=10`, {
      next: { revalidate: 600 }, // Revalidate posts every 10 mins
    });

    if (!postsRes.ok) { return []; }

    // Cast the response array to the defined Post[] interface
    const posts: Post[] = await postsRes.json();
    return posts;

  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}

// --- MAIN PAGE COMPONENT ---

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  // Posts array is now correctly typed as Post[]
  const posts = await getPostsByCategory(categorySlug);

  // Fallback to 404 if no posts or category is found
  if (posts.length === 0) {
    notFound();
  }

  // Use the category name from the first fetched category data (assuming getPostsByCategory returns category name or we use the slug)
  const displayCategoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace('-', ' ');

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      
      {/* Category Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 mb-8 border-b-4 border-red-100 pb-3">
        Latest News in {displayCategoryName}
      </h1>

      {/* Article List */}
      <div className="space-y-6">
        {/* FIX: The 'post' parameter is now explicitly typed as 'Post' via the 'posts' array type */}
        {posts.map((post: Post) => (
            // Reuse the ArticleCard component for consistent listing
            <ArticleCard key={post.id} post={post} categorySlug={categorySlug} />
        ))}
      </div>
      
    </div>
  );
}

// Optional: Metadata for the Category Page
// You can add a generateMetadata function here similar to the one in page.tsx
