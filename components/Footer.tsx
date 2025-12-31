// components/Footer.tsx

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// Define the categories for the footer (can be the same as the header list)
const footerCategories = [
    { slug: 'taja-khabar', name: 'तजा खबर' },
    { slug: 'bihar-news', name: 'बिहार न्यूज़' },
    { slug: 'up-news', name: 'यूपी न्यूज़' },
    { slug: 'politics', name: 'राजनीति' },
    { slug: 'entertainment', name: 'मनोरंजन' },
    { slug: 'khel', name: 'खेल' },
    { slug: 'dharm', name: 'धर्म' },
    { slug: 'karobar', name: 'करोबार' },
    { slug: 'rashifal', name: 'राशिफल' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          
          {/* Column 1: Logo and About */}
          <div>
            <Link href="/" className="text-3xl font-bold text-white hover:text-red-500 transition-colors">
            newsstate24
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              देश और दुनिया की ताज़ा ख़बरें, राजनीति, मनोरंजन, खेल, धर्म और ज्योतिष की सटीक जानकारी के लिए newsstate24 को फॉलो करें।
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-red-700 pb-1">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/content-policy" className="hover:text-white transition-colors">Content Policy</Link></li>
              <li><Link href="/correction-policy" className="hover:text-white transition-colors">Correction Policy</Link></li>
              <li><Link href="/diverse-staffing-policy" className="hover:text-white transition-colors">Diverse Staffing Policy</Link></li>
              <li><Link href="/fact-check-policy" className="hover:text-white transition-colors">Fact Check Policy</Link></li>
              <li><Link href="/terms-condition" className="hover:text-white transition-colors">Terms & Condition</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Column 3 & 4: Categories */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-red-700 pb-1">Category Links</h3>
            <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-3 text-sm">
                    {/* First Half of Categories */}
                    {footerCategories.slice(0, Math.ceil(footerCategories.length / 2)).map((cat) => (
                        <li key={cat.slug}>
                            <Link href={`/${cat.slug}`} className="hover:text-white transition-colors">
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="space-y-3 text-sm">
                    {/* Second Half of Categories */}
                    {footerCategories.slice(Math.ceil(footerCategories.length / 2)).map((cat) => (
                        <li key={cat.slug}>
                            <Link href={`/${cat.slug}`} className="hover:text-white transition-colors">
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-sm pt-4">
          &copy; {new Date().getFullYear()} **newsstate24**. All rights reserved.
        </div>
      </div>
    </footer>
  );
}