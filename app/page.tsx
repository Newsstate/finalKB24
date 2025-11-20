// app/page.tsx
import { ArticleCard } from '@/components/ArticleCard';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';

type WPPost = {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: any[];
    'wp:term'?: any[];
    [key: string]: any;
  };
};

// Next.js recommended data fetching function
async function getLatestPosts() {
  try {
    // Fetch top 10 posts, embedding featured media, author, and terms (categories/tags)
    const res = await fetch(`${API_URL}/posts?_embed&per_page=10`, {
      // Use Incremental Static Regeneration (ISR) to revalidate cache every 60 seconds
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-6 border-b pb-2 text-red-700">
        लेटेस्ट न्यूज़ (Latest News)
      </h1>
      {posts.length === 0 ? (
        <p className="text-lg">No posts found or API error.</p>
      ) : (
      posts.map((post: WPPost) => (
  <ArticleCard key={post.id} post={post} />
))


      )}
    </section>
  );
}
