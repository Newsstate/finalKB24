// app/page.tsx
import { ArticleCard, WPPost } from "@/components/ArticleCard";
import { CityNewsSection } from "@/components/CityNewsSection"; 


import { HeroSideListSection } from "@/components/HeroSideListSection"; // 👈 IMPORT NEW COMPONENT

// --- WordPress API config ---
const API_URL = "https://khabar24live.com/wp-json/wp/v2";

// ✅ CONFIG: Define the categories you want in the TOP TABS
const FEATURED_CATEGORIES = [
  { id: 1, title: "मनोरंजन" },     
  { id: 2, title: "राजनीति" },      
  { id: 3, title: "क्राइम" },       
  { id: 4, title: "वायरल" },       
];

const KHEL_CATEGORY_ID = 79; 
const ENT_CATEGORY_ID = 21;
const TECH_CATEGORY_ID = 30; 
const LIFESTYLE_CATEGORY_ID = 27;
const ASTRO_CATEGORY_ID = 26;
 

const POSTS_PER_SECTION = 8;

// --- Fetch Utility ---
async function getCategoryPosts(categoryId: number): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `${API_URL}/posts?categories=${categoryId}&_embed&per_page=${POSTS_PER_SECTION}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Fetch Error:", err);
    return [];
  }
}

/** ✅ FULL-WIDTH HERO + RIGHT LIST SECTION (Used for Khel section at the bottom) */
function WidePostsSection({ title, posts }: { title: string; posts: WPPost[] }) {
  if (!posts?.length) return null;

  const heroPost = posts[0];
  const listPosts = posts.slice(1, 5);

  return (
    <section className="mb-10">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-2xl font-extrabold text-gray-900 border-l-4 border-orange-600 pl-3">
          {title}
        </h2>

        <a href="#" className="text-red-600 text-sm font-semibold hover:underline">
          View More →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero left */}
        <div className="lg:col-span-2">
          <ArticleCard post={heroPost} variant="hero" />
        </div>

        {/* Right list */}
        <div className="space-y-4 lg:border-l lg:pl-4">
          {listPosts.map((post) => (
            <ArticleCard key={post.id} post={post} variant="list" />
          ))}
        </div>
      </div>
    </section>
  );
}

/** ✅ CATEGORY COLUMN — hero + list (used in 3-column layout) */
function ColumnPostsSection({
  title,
  posts,
}: {
  title: string;
  posts: WPPost[];
}) {
  if (!posts?.length) return null;

  const heroPost = posts[0];
  const listPosts = posts.slice(1, 6);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 border-l-4 border-orange-600 pl-3 mb-4">
        {title}
      </h2>

      {/* Big top card */}
      <ArticleCard post={heroPost} variant="hero" />

      {/* Small list items */}
      <div className="mt-4 space-y-3">
        {listPosts.map((post) => (
          <ArticleCard key={post.id} post={post} variant="list" />
        ))}
      </div>
    </section>
  );
}

/** ✅ 3-CATEGORY GRID SECTION */
async function ThreeCategorySections() {
  const categories = [
    { id: 22, title: "बिजनेस" },
    { id: 25, title: "ऑटो" },
    { id: 79, title: "खेल" },

    
  ];



  const postsArray = await Promise.all(
    categories.map((cat) => getCategoryPosts(cat.id))
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-10">
      {categories.map((cat, i) => (
        <ColumnPostsSection key={cat.id} title={cat.title} posts={postsArray[i]} />
      ))}
    </section>
  );
}



/** ✅ 3-CATEGORY GRID SECTION */
async function ThreeCategorySections1() {
  const categories = [
    { id: 48, title: "राशिफल" },
    { id: 90, title: "शेयर बाजार" },
    { id: 50, title: "शिक्षा" },

    
  ];



  const postsArray = await Promise.all(
    categories.map((cat) => getCategoryPosts(cat.id))
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-10">
      {categories.map((cat, i) => (
        <ColumnPostsSection key={cat.id} title={cat.title} posts={postsArray[i]} />
      ))}
    </section>
  );
}
/** ✅ MAIN PAGE */
export default async function HomePage() {
  
  // 1. Fetch data for all featured tabs concurrently
  const featuredPostsPromises = FEATURED_CATEGORIES.map(cat => 
    getCategoryPosts(cat.id)
  );
  const featuredPostsArray = await Promise.all(featuredPostsPromises);

  const allFeaturedData = FEATURED_CATEGORIES.map((cat, index) => ({
    id: cat.id,
    title: cat.title,
    posts: featuredPostsArray[index],
  }));
  
  // 2. Fetch data for the dedicated 'खेल' section
  const khelPosts = await getCategoryPosts(KHEL_CATEGORY_ID); 
  const ENTPosts = await getCategoryPosts(ENT_CATEGORY_ID); 
  const TECHPosts = await getCategoryPosts(TECH_CATEGORY_ID); 
  const LIFESTYLEPosts = await getCategoryPosts(LIFESTYLE_CATEGORY_ID); 
  const ASTROPosts = await getCategoryPosts(ASTRO_CATEGORY_ID); 

  return (
    <main className="max-w-7xl mx-auto px-2 py-6">
      
    

      {/* 💥 NEW: RECENT POSTS - HERO + SIDE LIST SECTION (Matches the new request) */}
      <HeroSideListSection />
     
      <hr className="my-10" />

      {/* 🏙️ CITY NEWS SECTION */}
      <CityNewsSection />

      <hr className="my-10" />
      
    


      {/* ✅ 3-Column Multi-Category Layout */}
      <ThreeCategorySections/>

      <WidePostsSection title="	धर्म" posts={ASTROPosts} />
<hr className="my-10" />

         {/* ✅ Khel Featured Section */}
         <WidePostsSection title="खेल" posts={khelPosts} />

<hr className="my-10" />




 {/* ✅ 3-Column Multi-Category Layout */}

         {/* ✅ ent Featured Section */}
         <ThreeCategorySections1 />
         <WidePostsSection title="मनोरंजन" posts={ENTPosts} />

<hr className="my-10" />


<WidePostsSection title="टेक" posts={TECHPosts} />
<hr className="my-10" />

<WidePostsSection title="लाइफस्टाइल" posts={LIFESTYLEPosts} />
<hr className="my-10" />
    </main>
  );
}
