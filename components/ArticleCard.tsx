// components/ArticleCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { hi } from 'date-fns/locale'; // Hindi locale for date formatting
import parse from 'html-react-parser';

// Minimal TypeScript interface for the post data
interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded: {
    'wp:featuredmedia'?: [{ source_url: string; alt_text: string }];
    'wp:term'?: [[{ slug: string; name: string }]];
  };
}

export function ArticleCard({ post }: { post: Post }) {
  // Extract category slug for the URL (assuming first category is used)
  const categorySlug = post._embedded['wp:term']?.[0]?.[0]?.slug || 'uncategorized';

  // Get featured image URL and alt text
  const featuredMedia = post._embedded['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || '/placeholder.jpg';
  const imageAlt = featuredMedia?.alt_text || post.title.rendered;

  // Format date to Indian/Hindi format
  const formattedDate = format(parseISO(post.date), 'dd MMMM yyyy, hh:mm a', { locale: hi });

  return (
    <div className="flex border-b pb-4 mb-4">
      <div className="w-1/3 mr-4 relative aspect-video">
        <Image 
          src={imageUrl} 
          alt={imageAlt} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }} 
          className="rounded-lg"
          unoptimized={true} // Set to true if images are not optimized by WordPress/CDN
        />
      </div>
      <div className="w-2/3">
        <span className="text-sm text-gray-500 block mb-1">
          {formattedDate}
        </span>
        <Link href={`/${categorySlug}/${post.slug}-${post.id}`} className="hover:text-red-700 transition">
          <h2 className="text-xl font-bold mb-2">
            {parse(post.title.rendered)}
          </h2>
        </Link>
        <div className="text-gray-600 text-sm line-clamp-3">
          {/* Render HTML excerpt safely */}
          {parse(post.excerpt.rendered)} 
        </div>
      </div>
    </div>
  );
}