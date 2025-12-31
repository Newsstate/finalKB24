// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image'; 

// Define the categories (copied from layout.tsx)
const categories = [
    { slug: '/', name: 'होम' },
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

const LOGO_URL = "https://www.khabar24live.com/wp-content/uploads/2026/01/site-logo.png";

export function Header() {
  return (
    <>
      {/* === MAIN HEADER (Logo/Branding) === */}
      {/* 🎯 CHANGED: bg-red-700 to bg-white. Removed text-white (not needed with white BG) */}
      <header className="bg-white shadow-lg sticky top-0 z-30">
        <div className="container mx-auto p-2 flex justify-between items-center">
          
          <Link href="/" className="flex items-center">
            <Image
                src={LOGO_URL}
                alt="newsstate24 Logo"
                width={150} // Set appropriate width for display
                height={40} // Set appropriate height for display
                unoptimized
                priority
                className="rounded-sm" 
            />
          </Link>
          
          {/* Optional: You can place a search box or ad space here */}
        </div>
      </header>

      {/* === HORIZONTAL CATEGORY NAVIGATION BAR (Sticky Position) === */}
      {/* The navigation bar background remains dark for visual separation */}
      <nav className="bg-gray-800 text-white shadow-md sticky top-[64px] z-20">
        <div 
          className="container mx-auto px-4 py-2 flex overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          {categories.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/${cat.slug}`}
              // Hover state changed to bg-red-700 for contrast
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