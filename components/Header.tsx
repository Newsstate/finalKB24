// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image'; 
import { FaSearch } from 'react-icons/fa'; 
import React, { useEffect } from 'react'; // 👈 Import React and useEffect for the Ad component
import Script from 'next/script'; // Import Script for ad push (optional, but good practice)

// Define the categories (copied from layout.tsx)
const categories = [
    { slug: 'entertainment', name: 'मनोरंजन' },
    { slug: 'latest', name: 'तजा खबर' },
    { slug: 'bihar', name: 'बिहार' },
    { slug: 'uttar-pradesh', name: 'उत्तर प्रदेश' },
    { slug: 'madhya-pradesh', name: 'मध्य प्रदेश' },
    { slug: 'rajasthan', name: 'राजस्थान' },
    { slug: 'uttarakhand', name: 'उत्तराखंड' },
    { slug: 'jharkhand', name: 'झारखण्ड' },
    { slug: 'chhattisgarh', name: 'छत्तीसगढ़ न्यूज़' },
    { slug: 'delhi-ncr', name: 'दिल्ली' },
    { slug: 'sports', name: 'खेल' },
    { slug: 'business', name: 'करोबार' },
    { slug: 'share-market', name: 'शेयर बाजार' },
    { slug: 'technology', name: 'टेक' },
    { slug: 'religion', name: 'धर्म' },
    { slug: 'horoscope', name: 'राशिफल' },
    { slug: 'panchang', name: 'पंचांग' },
    { slug: 'chalisa-aarti', name: 'चालीसा' },
    { slug: 'lifestyle', name: 'लाइफस्टाइल' },
];

const LOGO_URL = "https://www.newsstate24.com/wp-content/uploads/2025/09/khabar24live-300x300-1.jpg";
const ADSENSE_PUB_ID = 'ca-pub-6466761575770733'; // Define the constant here

// ===========================================
// 🔥 NEW COMPONENT: HEADER AD (Client Side)
// ===========================================
// Must be a client component to use useEffect
const HeaderAutoAd: React.FC = () => {
    // Client-side logic to push the ad
    useEffect(() => {
        try {
            // Check if the AdSense script is loaded and push the ad unit
            if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
                (window as any).adsbygoogle.push({});
            }
        } catch (e) {
            console.error("Header Auto Ad push failed:", e);
        }
    }, []);

    return (
        <div className="flex-1 max-w-lg mx-4 hidden lg:block"> {/* Hide on mobile/small screens, show on large screens */}
            <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={ADSENSE_PUB_ID}
                data-ad-slot="1052759617" 
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};
// ===========================================
// END: HEADER AD COMPONENT
// ===========================================


export function Header() {
  const mainHeaderHeight = 64; 

  return (
    <>
      {/* === MAIN HEADER (Logo, Ad, and Search) === */}
      <header className="bg-white shadow-lg sticky top-0 z-30">
        <div className="container mx-auto p-4 flex justify-between items-center h-[64px]">
          
          <Link href="/" className="flex items-center">
            <Image
                src={LOGO_URL}
                alt="Khabar24Live Logo"
                width={150} 
                height={40} 
                unoptimized
                priority
                className="rounded-sm" 
            />
          </Link>
          
          {/* ✅ NEW: Auto Ad Placement */}
          {/* NOTE: If you extract HeaderAutoAd to a separate file, 
             you must add 'use client' at the top of that file. */}
          <HeaderAutoAd />

          {/* Search Button/Icon */}
          <Link 
            href="/search" 
            aria-label="Search"
            className="text-gray-700 hover:text-red-700 transition p-2 rounded-full border border-gray-300 hover:border-red-700 flex-shrink-0"
          >
            <FaSearch size={20} />
          </Link>
          
        </div>
      </header>

      {/* === HORIZONTAL CATEGORY NAVIGATION BAR (Sticky Position) === */}
      <nav className="bg-gray-800 text-white shadow-md sticky top-[64px] z-20"> 
        <div 
          className="container mx-auto px-4 py-2 flex overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          {categories.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-medium px-4 py-1 hover:bg-red-700 transition duration-150 flex-shrink-0"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}