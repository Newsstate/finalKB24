// app/page.tsx
import { ArticleCard } from '@/components/ArticleCard';

// Define the type for a single post object, matching the requirements of ArticleCard
// This interface is copied from or should match the WPPost interface in ArticleCard.tsx
interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string; // Added link as it was in your original Post definition
  _embedded: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
    'wp:term'?: Array<Array<{
      slug: string;
      name: string;
    }>>;
    [key: string]: any;
  };
}


const API_URL = 'https://khabar24live.com/wp-json/wp/v2';


// Next.js recommended data fetching function
// The return type is updated to Promise<Post[]>
async function getLatestPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts?_embed&per_page=10`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }
    
    // Cast the result to Post[]
    // Note: The API response will contain other fields, but we only cast to the fields we defined
    return res.json() as Promise<Post[]>; 
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
        // The 'post' parameter now correctly satisfies the WPPost requirements
        posts.map((post) => (
          // TypeScript now knows 'post' has the correct shape for ArticleCard
          <ArticleCard key={post.id} post={post} /> 
        ))
      )}
    </section>
  );
}
