// app/layout.tsx
import './globals.css';
import { Header } from '@/components/Header'; 
import { Footer } from '@/components/Footer'; 
import Image from 'next/image';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { hi } from 'date-fns/locale';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
// NOTE: BASE_URL is not strictly needed here but useful for reference if links needed absolute paths
// const BASE_URL = 'https://www.khabar24live.com';

export const metadata = {
  title: 'Khabar24Live - Next.js',
  description: 'Recreation of khabar24live.com using Next.js and WordPress API',
};


// --- TYPE DEFINITIONS ---

interface RecentPost {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    categories: number[];
    _embedded?: {
        'wp:featuredmedia'?: [{ source_url: string; alt_text: string }];
    };
}

interface Category {
    id: number;
    slug: string;
}

// --- DATA FETCHING UTILITIES ---

/**
 * Fetches the list of all categories to resolve IDs to Slugs.
 */
async function getCategoryMap(): Promise<Map<number, string>> {
    const categoryMap = new Map<number, string>();
    try {
        const res = await fetch(`${API_URL}/categories?_fields=id,slug&per_page=100`);
        if (!res.ok) return categoryMap;
        
        const categories: Category[] = await res.json();
        categories.forEach(cat => categoryMap.set(cat.id, cat.slug));
        
    } catch (error) {
        console.error("Failed to fetch categories for map:", error);
    }
    return categoryMap;
}

/**
 * Fetches the 5 most recent posts for the sidebar, including featured media.
 */
async function getRecentPosts(): Promise<RecentPost[]> {
    try {
        // Fetch 5 posts, include _embed for featured media
        const res = await fetch(`${API_URL}/posts?_embed&_fields=id,slug,title,categories,date,_embedded&per_page=5&orderby=date`, {
            next: { revalidate: 600 }, // Revalidate every 10 mins
        });
        if (!res.ok) return [];
        const posts: RecentPost[] = await res.json();
        return posts;
    } catch (error) {
        console.error('Error fetching recent posts:', error);
        return [];
    }
}

// --- RECENT POSTS SIDEBAR COMPONENT ---

const RecentPostsSidebar: React.FC<{ posts: RecentPost[], categoryMap: Map<number, string> }> = ({ posts, categoryMap }) => {
    if (posts.length === 0) return (
        <div className="bg-gray-100 p-3 rounded h-64 flex items-center justify-center text-gray-500">
            No recent posts found.
        </div>
    );

    return (
        <div className="bg-white p-4 sm:p-4 rounded-xl shadow-lg border border-gray-200 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 border-red-300">
                Latest News
            </h2>
            <ul className="space-y-4">
                {posts.map(post => {
                    const title = post.title.rendered.replace(/<[^>]*>?/gm, '');
                    const primaryCatId = post.categories?.[0]; 
                    const categorySlug = primaryCatId ? categoryMap.get(primaryCatId) : 'uncategorized';
                    
                    // Construct the correct URL: /category/slug-id
                    const postPath = `/${categorySlug}/${post.slug}-${post.id}`;
                    
                    // Note: Image fetching logic is intentionally removed from rendering below, 
                    // but data fetching still includes '_embedded' in case it's needed elsewhere.

                    return (
                        <li key={post.id} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                            {/* Link now covers the entire text area and is styled as a block element */}
                            <Link href={postPath} className="block group hover:text-red-600 transition">
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-red-700 line-clamp-3">
                                        {title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {/* Format date in Hindi locale */}
                                        {format(parseISO(post.date), 'dd MMM yyyy', { locale: hi })}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};


// NOTE: RootLayout must be an async function to fetch data
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  // Fetch data for the sidebar concurrently
  const [recentPosts, categoryMap] = await Promise.all([
    getRecentPosts(),
    getCategoryMap()
  ]);

  return (
    <html lang="hi">
      <body>
        
        {/* === HEADER COMPONENT === */}
        <Header /> 

        {/* === Main Content Area === */}
        <main className="max-w-7xl mx-auto p-4 sm:p-8 min-h-screen">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Content (3/4 width) */}
            <div className="w-full lg:w-3/4">
              {children}
            </div>
            
            {/* Sidebar (1/4 width) */}
            <aside className="w-full lg:w-1/4">
                
                {/* Ad Code Block - Placed just before the RecentPostsSidebar */}
                <div className="mb-8 p-2 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="text-center">
                        {/* Using standard <img> for external ad content */}
                        <img 
                            src="https://www.gourmetads.com/wp-content/uploads/2022/01/learn-more-heinz-300x250-call-to-action.jpg" 
                            alt="Advertisement: Learn more about Heinz" 
                            width={300} 
                            height={250} 
                            className="mx-auto rounded-lg"
                        />
                    </div>
                </div>
              
              <RecentPostsSidebar posts={recentPosts} categoryMap={categoryMap} />
            </aside>
          </div>
        </main>
        
        {/* === Footer Integration === */}
        <Footer />

      </body>
    </html>
  );
}