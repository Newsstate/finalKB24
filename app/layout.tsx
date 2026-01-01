// app/layout.tsx
import './globals.css';
import { Header } from '@/components/Header'; 
import { Footer } from '@/components/Footer'; 
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { hi } from 'date-fns/locale';
import Image from 'next/image'; 
import { Ad300x250 } from '@/components/Ad300x250';
import Script from 'next/script'; // 👈 IMPORT THE SCRIPT COMPONENT

// --- CONFIGURATION CONSTANTS ---
const API_URL = 'https://www.khabar24live.com/wp-json/wp/v2';
const GA_TRACKING_ID = 'G-TKW1SEK3SH'; 
const ADSENSE_PUB_ID = 'ca-pub-6466761575770733'; 


// ✅ CONFIGURATION FOR SIDEBAR CATEGORY
const SIDEBAR_CATEGORY_ID = 1; 
const SIDEBAR_CATEGORY_TITLE = 'ट्रेंडिंग न्यूज़'; 
// -------------------------------

export const metadata = {
  title: 'न्यूज़ स्टेट 24 (Newsstate24) हिंदी न्यूज़ - ताज़ा हिंदी खबरें, ब्रेकिंग न्यूज़ 24x7',
  description: 'Newsstate24 Hindi (न्यूज़ स्टेट 24) पर पढ़ें ताज़ा हिंदी खबरें, ब्रेकिंग न्यूज़, देश-दुनिया, राजनीति, खेल, मनोरंजन और अन्य बड़ी खबरें सबसे पहले।',
  icons: {
    icon: 'https://www.khabar24live.com/wp-content/uploads/2026/01/newsstate-fav.png',          // Standard favicon
    
  },
};

// --- TYPE DEFINITIONS ---
interface CategoryPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>; 
  };
}

interface Category {
  id: number;
  slug: string;
}

// --- DATA FETCHING UTILITIES ---
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

async function getCategorySidebarPosts(categoryId: number): Promise<CategoryPost[]> {
  try {
    // Note: The revalidate tag is for Incremental Static Regeneration (ISR) 
    const res = await fetch(
      `${API_URL}/posts?categories=${categoryId}&_embed&_fields=id,slug,title,categories,date,_embedded&per_page=5&orderby=date`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Error fetching sidebar category posts:', error);
    return [];
  }
}

// --- SIDEBAR CATEGORY POSTS COMPONENT ---
const CategoryPostsSidebar: React.FC<{ posts: CategoryPost[], categoryMap: Map<number, string> }> = ({ posts, categoryMap }) => {
  if (posts.length === 0) {
    return (
      <div className="bg-gray-100 p-3 rounded h-64 flex items-center justify-center text-gray-500">
        इस कैटेगरी में कोई पोस्ट नहीं मिली।
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-4 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 border-red-600">
        {SIDEBAR_CATEGORY_TITLE}
      </h2>

      <ul className="space-y-4">
        {posts.map(post => {
          const title = post.title.rendered.replace(/<[^>]*>?/gm, '');
          const primaryCatId = post.categories?.[0];
          const categorySlug = primaryCatId ? categoryMap.get(primaryCatId) : 'uncategorized';
          const postPath = `/${categorySlug}/${post.slug}-${post.id}`;
          
          return (
            <li key={post.id} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
              <Link href={postPath} className="block group hover:text-red-600 transition">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-red-700 leading-tight line-clamp-3">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
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


// --- ROOT LAYOUT ---
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarPosts, categoryMap] = await Promise.all([
    getCategorySidebarPosts(SIDEBAR_CATEGORY_ID),
    getCategoryMap()
  ]);

  return (
    <html lang="hi">
      
      {/* 🛑 DNS Prefetching/Preconnect Links */}
      <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />
      <link rel="dns-prefetch" href="//tpc.googlesyndication.com" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://tpc.googlesyndication.com" crossOrigin="anonymous" />
      
      {/* 🛑 Google Tag (gtag.js) Script Implementation */}
      <Script 
        strategy="afterInteractive" 
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics-config" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />

      {/* 🛑 AdSense Loader Script (LOADS MAIN ADSBYGOOGLE.JS) */}
      <Script 
        async 
        strategy="afterInteractive" 
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
        crossOrigin="anonymous"
      />
      
      {/* 🛑 AMP Custom Element Scripts (Required for AMP-AD) */}
      <Script 
        strategy="lazyOnload" 
        src="https://cdn.ampproject.org/v0/amp-ad-0.1.js" 
        key="amp-ad" 
      />
      
      <body>
        <Header />
        <meta name="google-site-verification" content="tIj3q1ffMOLmnc6fGrlCDIR1fOfIExVhbXcpg_MzxXQ" />
        {/* === Main Content Area === */}
        <main className="max-w-7xl mx-auto p-4 sm:p-8 min-h-screen">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              {children}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 h-fit space-y-8">
              
              {/* 🎯 START: AD CODE BLOCK (BEFORE TRENDING POSTS) */}
              विज्ञापन
           <Ad300x250 />

            
              {/* 🎯 END: AD CODE BLOCK */}


              {/* 🎯 Category Posts Sidebar (Your 'Trending Posts' component) */}
              <CategoryPostsSidebar posts={sidebarPosts} categoryMap={categoryMap} /> 

            </aside>

          </div>
        </main>

{/* 🎯 START: FLOATING MOBILE AD (320x50) 🎯 */}
<div 
          // Hide on screen sizes >= sm (typically tablet/desktop), ensuring it's mobile only
          className="sm:hidden 
             fixed bottom-0 left-0 w-full z-50 
             bg-white shadow-2xl p-0.5"
        >
            <div className="flex justify-center items-center w-full h-[50px]">
                
                {/* Note: The AdSense script load is already included above in the layout. 
                  We only need the ins tag and the push command here. 
                */}
                <ins className="adsbygoogle"
                     style={{ display: 'inline-block', width: '320px', height: '50px' }}
                     data-ad-client={ADSENSE_PUB_ID}
                     data-ad-slot="8246126457"></ins>
                
                {/* Push Ad Script */}
                <Script 
                    id="adsense-push-mobile-sticky" 
                    strategy="afterInteractive"
                >
                    {`
                      (window.adsbygoogle = window.adsbygoogle || []).push({});
                    `}
                </Script>
            </div>
        </div>
        {/* 🎯 END: FLOATING MOBILE AD 🎯 */}
        <Footer />
      </body>
    </html>
  );
}
