// app/[category]/[slugAndId]/page.tsx

import Image from 'next/image';
import parse from 'html-react-parser';
import { parseISO, format } from 'date-fns';
import { hi } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
const BASE_URL = 'https://www.khabar24live.com'; // IMPORTANT: Replace with your actual domain

// Utility function to extract only the slug from the URL segment
const extractSlug = (slugAndId: string) => {
    // The pattern is "article-title-53175" -> we want "article-title"
    const parts = slugAndId.split('-');
    // Remove the last part (the ID)
    return parts.slice(0, -1).join('-'); 
};

async function getPost(slug: string) {
  try {
    // Search by slug and embed details
    const res = await fetch(`${API_URL}/posts?_embed&slug=${slug}`, {
      next: { revalidate: 1800 }, // Revalidate every 30 mins
    });

    if (!res.ok) { return null; }

    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;

  } catch (error) {
    console.error('Error fetching single post:', error);
    return null;
  }
}

// === METADATA & SEO GENERATION ===
export async function generateMetadata({ params }: { params: { slugAndId: string } }): Promise<Metadata> {
  const postSlug = extractSlug(params.slugAndId);
  const post = await getPost(postSlug);
  
  if (!post) {
    return { title: 'Not Found' };
  }

  const articlePath = `${BASE_URL}/${params.slugAndId}`;
  const ampPath = `${articlePath}/amp`;
  const title = post.title.rendered.replace(/<[^>]*>?/gm, ''); // Clean title
  const description = post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'; // Clean excerpt

  return {
    title: title,
    description: description,
    
    

    // Open Graph / Social Media metadata
    openGraph: {
      title: title,
      description: description,
      url: articlePath,
      type: 'article',
      images: [
        {
          url: post._embedded['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg',
          alt: title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.modified_gmt || post.date,
    },
    // Add other SEO tags like Twitter and JSON-LD here
  };
}


export default async function PostPage({ params }: { 
    params: { category: string; slugAndId: string } 
}) {
  const postSlug = extractSlug(params.slugAndId);
  const post = await getPost(postSlug);

  if (!post) {
    notFound();
  }

  // Extract needed data
  const title = post.title.rendered;
  const content = post.content.rendered;
  const date = post.date;
  const authorName = post._embedded.author?.[0]?.name || 'Khabar24Live Desk';
  const authorAvatarUrl = post._embedded.author?.[0]?.avatar_urls?.[96] || '/default-avatar.png';
  const featuredMedia = post._embedded['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || '/placeholder-large.jpg';
  const imageAlt = featuredMedia?.alt_text || title;
  
  const formattedDate = format(parseISO(date), 'dd MMMM yyyy, hh:mm a', { locale: hi });
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1).replace('-', ' ');


  return (
    <article className="bg-white p-6 rounded-lg shadow-lg text-black">

      
      {/* Category Link */}
      <Link href={`/${params.category}`} className="text-red-700 hover:underline text-sm font-semibold uppercase">
        {categoryName}
      </Link>
      
      {/* Hindi Headline */}
      <h1 className="text-4xl font-extrabold mt-2 mb-4 text-gray-900">
        {parse(title)}
      </h1>
      
      {/* Author and Date/Time Detail */}
      <div className="flex items-center text-sm text-gray-500 mb-6 border-b pb-4">
        <Image 
            src={authorAvatarUrl} 
            alt={authorName} 
            width={32} 
            height={32} 
            className="rounded-full mr-3" 
            unoptimized // Assuming WordPress avatars aren't optimized
        />
        <span>By **{authorName}** | Published: {formattedDate}</span>
      </div>

      {/* Article Summary (Excerpt) */}
      {post.excerpt.rendered && (
        <div className="text-lg font-semibold italic text-gray-700 mb-6 border-l-4 border-red-500 pl-4">
            {parse(post.excerpt.rendered)}
        </div>
      )}

      {/* Featured Media Image */}
      <div className="relative w-full aspect-video mb-6">
        <Image 
          src={imageUrl} 
          alt={imageAlt} 
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }} 
          className="rounded-xl"
          unoptimized={true} // Use true if not using Next.js Image Optimization features
        />
      </div>

      

      {/* Main Content */}
      <div className="prose max-w-none text-lg leading-relaxed text-black custom-article-body">
  {parse(
    content.replace(/<\/p>/g, '</p><br/>')
  )}
</div>
      
    </article>
  );
}

// Optional: Generate static paths for better performance (SSG)
export async function generateStaticParams() {
    // You would fetch a list of your top/recent post slugs here
    return [
        { category: 'entertainment', slugAndId: 'its-confirmed-korean-action-star-don-lee-joins-prabhas-triptii-dimri-spirit-directed-by-sandeep-reddy-vanga-53175' },
    ];
}