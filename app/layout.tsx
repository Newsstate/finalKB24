// app/layout.tsx
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { hi } from 'date-fns/locale';
import Image from 'next/image';
import Script from 'next/script';
import { Ad300x250 } from '@/components/Ad300x250';

// ---------------- CONFIG ----------------
const API_URL = 'https://www.khabar24live.com/wp-json/wp/v2';
const GA_TRACKING_ID = 'G-TKW1SEK3SH';
const ADSENSE_PUB_ID = 'ca-pub-6466761575770733';

// Sidebar Title
const SIDEBAR_TITLE = 'ताज़ा खबरें';

// ---------------- METADATA ----------------
export const metadata = {
  title: 'न्यूज़ स्टेट 24 (Newsstate24) हिंदी न्यूज़ - ताज़ा हिंदी खबरें',
  description:
    'Newsstate24 पर पढ़ें ताज़ा हिंदी खबरें, ब्रेकिंग न्यूज़, देश-दुनिया, राजनीति, खेल, मनोरंजन।',
  icons: {
    icon: 'https://www.khabar24live.com/wp-content/uploads/2025/09/cropped-Fevicon.ico-180x180.jpg',
  },
};

// ---------------- TYPES ----------------
interface Post {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  categories: number[];
}

interface Category {
  id: number;
  slug: string;
}

// ---------------- DATA FETCH ----------------
async function getCategoryMap(): Promise<Map<number, string>> {
  const map = new Map<number, string>();
  try {
    const res = await fetch(`${API_URL}/categories?_fields=id,slug&per_page=100`);
    if (!res.ok) return map;
    const cats: Category[] = await res.json();
    cats.forEach(cat => map.set(cat.id, cat.slug));
  } catch (e) {
    console.error('Category map error:', e);
  }
  return map;
}

// ✅ RECENT POSTS (ALL CATEGORIES)
async function getRecentSidebarPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_fields=id,slug,title,categories,date&per_page=6&orderby=date&order=desc`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Recent posts error:', e);
    return [];
  }
}

// ---------------- SIDEBAR COMPONENT ----------------
const RecentPostsSidebar = ({
  posts,
  categoryMap,
}: {
  posts: Post[];
  categoryMap: Map<number, string>;
}) => {
  if (!posts.length) {
    return (
      <div className="bg-gray-100 p-4 rounded text-gray-500 text-center">
        कोई ताज़ा खबर उपलब्ध नहीं है।
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 border-red-600">
        {SIDEBAR_TITLE}
      </h2>

      <ul className="space-y-4">
        {posts.map(post => {
          const title = post.title.rendered.replace(/<[^>]+>/g, '');
          const categoryId = post.categories?.[0];
          const categorySlug =
            (categoryId && categoryMap.get(categoryId)) || 'news';

          const url = `/${categorySlug}/${post.slug}-${post.id}`;

          return (
            <li
              key={post.id}
              className="border-b last:border-0 pb-3 last:pb-0"
            >
              <Link href={url} className="group block">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-red-700 line-clamp-3">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {format(parseISO(post.date), 'dd MMM yyyy', { locale: hi })}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ---------------- ROOT LAYOUT ----------------
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentPosts, categoryMap] = await Promise.all([
    getRecentSidebarPosts(),
    getCategoryMap(),
  ]);

  return (
    <html lang="hi">
      <head>
        {/* DNS PREFETCH */}
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />

        {/* GOOGLE ANALYTICS */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="ga-config"
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

        {/* ADSENSE */}
        <Script
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
        />
      </head>

      <body>
        <Header />

        <main className="max-w-7xl mx-auto p-4 sm:p-8 min-h-screen">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* MAIN CONTENT */}
            <div className="w-full lg:w-3/4">{children}</div>

            {/* SIDEBAR */}
            <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 space-y-8">
              <Ad300x250 />

              <RecentPostsSidebar
                posts={recentPosts}
                categoryMap={categoryMap}
              />
            </aside>
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
