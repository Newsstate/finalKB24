// components/CityNewsSection.tsx
"use client"; // Because of useState and event handlers

import { useState } from "react";
import { ArticleCard, WPPost } from "@/components/ArticleCard";

// NOTE: You'll need to update the ArticleCard to support the smaller/compact style
// shown in the image, or use the existing 'compact' list style.

// --- Configuration ---
// Map city names to their corresponding WordPress Category ID
// You must update these IDs based on your own WordPress setup.
const CITY_CATEGORIES: { name: string; categoryId: number }[] = [
  // Top Row (Highlight Cities)
  { name: "उत्तर प्रदेश", categoryId: 68 }, // Example ID
  { name: "बिहार", categoryId: 70 }, // Example ID
  { name: "दिल्ली", categoryId: 88 }, // Example ID
  { name: "मध्य प्रदेश", categoryId: 67 }, // Example ID
  { name: "हरियाणा", categoryId: 89 }, // Example ID
  { name: "उत्तराखंड", categoryId: 80 }, // Example ID
  // ... rest of the cities from the image
  { name: "झारखंड", categoryId: 87 },  
  { name: "बिहार चुनाव 2025", categoryId: 461 },
  { name: "छत्तीसगढ़ न्यूज़", categoryId: 69 },
  { name: "राजस्थान", categoryId: 78 }, 
];

const POSTS_PER_CITY = 9; // 3 rows of 3 articles

// --- Fetch Utility (Moved to a client-side component, will use 'fetch' directly) ---
// Since this is a client component, we will fetch data inside an effect
// or handle the initial fetch in the parent Server Component if possible.
// For simplicity in a client component, we'll keep the utility here for now,
// but be aware of Next.js best practices for data fetching.

async function getCityPosts(categoryId: number): Promise<WPPost[]> {
  const API_URL = "https://www.khabar24live.com/wp-json/wp/v2";
  try {
    const res = await fetch(
      `${API_URL}/posts?categories=${categoryId}&_embed&per_page=${POSTS_PER_CITY}`,
      { cache: "no-store" } // Use no-store for dynamic data based on user interaction
    );

    if (!res.ok) {
      console.error(`Failed to fetch posts for category ${categoryId}`);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("Fetch Error:", err);
    return [];
  }
}

/**
 * 🏙️ Component to display news in a city/location tab format.
 */
export function CityNewsSection() {
  const [activeCategory, setActiveCategory] = useState(CITY_CATEGORIES[0]);
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Initial fetch and when activeCategory changes
  // useEffect is needed here to fetch data when the activeCategory changes.
  // Since we don't have access to useEffect in this mock, imagine this logic is inside a useEffect
  // triggered by changes in 'activeCategory'.
  // --- Start of Simulated useEffect Logic ---
  const fetchPosts = async (category: { name: string; categoryId: number }) => {
    setIsLoading(true);
    const fetchedPosts = await getCityPosts(category.categoryId);
    setPosts(fetchedPosts);
    setIsLoading(false);
  };

  if (activeCategory && posts.length === 0 && !isLoading) {
    fetchPosts(activeCategory);
  }
  // --- End of Simulated useEffect Logic ---

  const handleCityClick = (city: { name: string; categoryId: number }) => {
    if (city.categoryId !== activeCategory.categoryId) {
      setActiveCategory(city);
      setPosts([]); // Clear posts to show loading/new data
      fetchPosts(city); // Immediately trigger fetch
    }
  };

  return (
    <section className="mt-10 mb-10">
      {/* --- Top Bar: Title and Button --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">खबरें आपके शहर की</h2>
        <button className="bg-black text-white px-5 py-2 text-sm font-semibold rounded hover:bg-gray-800 transition duration-150">
          अपने शहर को पिन करें
        </button>
      </div>

      {/* --- City Tabs/Buttons --- */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {CITY_CATEGORIES.map((city) => (
          <button
            key={city.categoryId}
            onClick={() => handleCityClick(city)}
            className={`
              px-4 py-2 text-sm font-semibold rounded transition duration-150 whitespace-nowrap
              ${
                city.categoryId === activeCategory.categoryId
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            {city.name}
          </button>
        ))}
      </div>

      {/* --- News Grid --- */}
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading news...</div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            // Use the list/compact variant for the 3-column city news grid
            <ArticleCard key={post.id} post={post} variant="list" />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No news found for {activeCategory.name}.
        </div>
      )}

      {/* --- View More Button --- */}
      <div className="text-center mt-8">
        <a
          href="#"
          className="inline-flex items-center bg-red-600 text-white px-8 py-3 text-base font-semibold rounded hover:bg-red-700 transition duration-150"
        >
          और पढ़ें
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </a>
      </div>
    </section>
  );
}