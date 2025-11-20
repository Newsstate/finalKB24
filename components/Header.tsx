// components/Header.tsx
import Link from 'next/link';

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

export function Header() {
  return (
    <>
      {/* === MAIN HEADER (Logo/Branding) - Stays at the top === */}
      {/* z-30 ensures it sits above the sticky nav bar */}
      <header className="bg-red-700 text-white shadow-lg sticky top-0 z-30">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold">
            Khabar24Live
          </Link>
          {/* Optional: You can place a search box or ad space here */}
        </div>
      </header>

      {/* === HORIZONTAL CATEGORY NAVIGATION BAR (Sticky Position) === */}
      {/* top-[64px] positions it just below the header (assuming header height is ~64px/4rem) */}
      {/* z-20 keeps it below the main header but sticky */}
      <nav className="bg-gray-800 text-white shadow-md sticky top-[64px] z-20">
        <div 
          className="container mx-auto px-4 py-2 flex overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          {categories.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/${cat.slug}`}
              // flex-shrink-0 prevents items from condensing, forcing overflow
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