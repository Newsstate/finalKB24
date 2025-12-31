// components/HeroSideListSection.tsx
import { ArticleCard, WPPost } from "@/components/ArticleCard";

// --- Configuration ---
const API_URL = "https://khabar24live.com/wp-json/wp/v2";
const POSTS_TO_FETCH = 6; // 1 Hero + 5 List items

// --- Fetch Utility ---
async function getRecentPosts(): Promise<WPPost[]> {
  try {
    // Fetch the most recent posts, ignoring category, and order by date
    const res = await fetch(
      `${API_URL}/posts?_embed&per_page=${POSTS_TO_FETCH}&orderby=date&order=desc`,
      // Set a low revalidation time for the most recent news
      { next: { revalidate: 30 } } 
    );

    if (!res.ok) {
      console.error(`Failed to fetch recent posts.`);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("Fetch Error:", err);
    return [];
  }
}

/**
 * ⚡️ Component to display the latest news in a Hero + Side List format.
 * This is a Server Component.
 */
export async function HeroSideListSection() {
  const posts = await getRecentPosts();

  if (!posts?.length) return null;

  const heroPost = posts[0];
  const listPosts = posts.slice(1); // Get the next 5 posts

  return (
    // 1. Outer section keeps a standard margin or no margin, depending on your layout needs
    <section className="my-10">
        
        {/* 2. Title/Control Bar: Applied the requested margins as Tailwind classes */}
        <div className="flex flex-wrap justify-between items-center -mt-10 mb-10 gap-1"> 
            <h2 className="text-2xl font-extrabold text-gray-900 border-l-4 border-red-600 pl-3">
                ताज़ा खबरें
            </h2>
            <a href="#" className="text-red-600 text-sm font-semibold hover:underline">
                View All →
            </a>
        </div>

        {/* 3. Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero left (Big card) */}
            <div className="lg:col-span-2">
                <ArticleCard post={heroPost} variant="hero" />
            </div>

            {/* Right list (Small items) */}
            <div className="space-y-4 lg:border-l lg:pl-4">
                {listPosts.map((post) => (
                    // The 'list' variant is perfect for the small vertical items
                    <ArticleCard key={post.id} post={post} variant="list" />
                ))}
            </div>
        </div>
    </section>
  );
}