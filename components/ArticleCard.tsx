// components/ArticleCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { hi } from 'date-fns/locale';
import parse from 'html-react-parser';

// ✅ WordPress Post Type
export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link?: string;
  _embedded: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
    'wp:term'?: Array<Array<{
      slug: string;
      name: string;
    }>>;
    [key: string]: any;
  };
}

interface ArticleCardProps {
  post: WPPost;
  variant: 'hero' | 'list' | 'default';
}

export function ArticleCard({ post, variant }: ArticleCardProps) {
  const categorySlug =
    post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';

  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || '/placeholder.jpg';
  const imageAlt = featuredMedia?.alt_text || post.title.rendered;

  const formattedDate = format(
    parseISO(post.date),
    'dd MMMM yyyy, hh:mm a',
    { locale: hi }
  );

  const postLink = `/${categorySlug}/${post.slug}-${post.id}`;

  // ✅ LIST VARIANT (Right column small items)
  if (variant === "list") {
    return (
      <div className="flex py-2 border-b last:border-none">
        <div className="w-24 h-20 mr-3 relative flex-shrink-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="rounded-md object-cover"
            unoptimized
          />
        </div>

        <div className="flex-1 flex items-center">
          <Link href={postLink}>
            <h3 className="text-sm font-semibold leading-snug line-clamp-3 hover:text-orange-700 transition">
              {parse(post.title.rendered)}
            </h3>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ HERO VARIANT (Big top card)
  if (variant === "hero") {
    return (
      <div className="flex flex-col group">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="rounded-lg object-cover transition group-hover:opacity-90"
            unoptimized
          />
        </div>

        <div className="mt-3">
          <Link href={postLink}>
            <h2 className="text-xl md:text-2xl font-extrabold leading-tight mb-2 hover:text-red-700 transition">
              {parse(post.title.rendered)}
            </h2>
          </Link>

          <p className="text-gray-600 text-sm md:text-base line-clamp-3">
            {parse(post.excerpt.rendered)}
          </p>
        </div>
      </div>
    );
  }

  // ✅ DEFAULT VARIANT (General listing)
  return (
    <div className="flex gap-4 border-b pb-4 mb-4">
      <div className="relative w-32 md:w-48 aspect-video flex-shrink-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="rounded-lg object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-col justify-between">
        <span className="text-xs text-gray-500 mb-1">{formattedDate}</span>

        <Link href={postLink}>
          <h2 className="text-base md:text-lg font-bold leading-snug hover:text-red-700 transition">
            {parse(post.title.rendered)}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm line-clamp-2 md:line-clamp-3">
          {parse(post.excerpt.rendered)}
        </p>
      </div>
    </div>
  );
}
