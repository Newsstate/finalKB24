// app/[category]/[slugAndId]/amp/page.tsx

import parse from 'html-react-parser';
import { notFound } from 'next/navigation';
import { parseISO, format } from 'date-fns';
import { hi } from 'date-fns/locale';

const API_URL = 'https://khabar24live.com/wp-json/wp/v2';
const BASE_URL = 'https://www.khabar24live.com'; // IMPORTANT: Replace with your actual domain

// --- Re-use Data Fetching Logic ---
const extractSlug = (slugAndId: string) => {
    const parts = slugAndId.split('-');
    return parts.slice(0, -1).join('-'); 
};

async function getPost(slug: string) {
  try {
    const res = await fetch(`${API_URL}/posts?_embed&slug=${slug}`, {
      next: { revalidate: 300 }, 
    });
    if (!res.ok) { return null; }
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    return null;
  }
}
// --- End Data Fetching ---

export default async function AmpPostPage({ params }: { 
    params: { category: string; slugAndId: string } 
}) {
  const postSlug = extractSlug(params.slugAndId);
  const post = await getPost(postSlug);

  if (!post) {
    notFound();
  }

  const title = post.title.rendered;
  const content = post.content.rendered;
  const date = post.date;
  const authorName = post._embedded.author?.[0]?.name || 'Khabar24Live Desk';
  const featuredMedia = post._embedded['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || '/placeholder-large.jpg';
  const imageAlt = featuredMedia?.alt_text || title;
  
  const formattedDate = format(parseISO(date), 'dd MMMM yyyy, hh:mm a', { locale: hi });
  
  // Define the canonical URL pointing to the main non-AMP page
  const canonicalUrl = `${BASE_URL}/${params.category}/${params.slugAndId}`; 

  // NOTE: This component is rendered within the Next.js Layout. 
  // For true AMP compliance, you'd need a custom full document renderer,
  // but this provides the required content and the critical canonical link.

  return (
    <div 
        className="amp-container" 
        style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#fff' }}
    >
      
      {/* ⚠️ CRITICAL AMP CANONICAL LINK */}
      {/* This link must be present in the <head> of the document for AMP validation.
         In a React component, you can use the built-in Metadata function to inject it.
         For now, we place it as a simple visible marker: */}
      <p style={{ display: 'none' }}><a rel="canonical" href={canonicalUrl}>Canonical Link</a></p>

      {/* AMP Header - Minimalistic */}
      <header style={{ backgroundColor: '#cc0000', color: 'white', padding: '10px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5em' }}>Khabar24Live</h1>
      </header>
      
      <article style={{ padding: '20px' }}>
        
        <h1 style={{ fontSize: '2em', marginBottom: '10px' }}>
          {parse(title)}
        </h1>

        <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '15px' }}>
          By **{authorName}** | Published: {formattedDate}
        </div>

        {/* --- Featured Image (Simulating AMP-IMG) --- */}
        {imageUrl && (
            <div style={{ marginBottom: '20px' }}>
                {/* NOTE: AMP requires <amp-img>, but here we use standard <img> due to React component limitations. */}
                <img 
                    src={imageUrl} 
                    alt={imageAlt} 
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
            </div>
        )}
        
        {/* Article Body Content */}
        <div 
          className="amp-content" 
          style={{ lineHeight: '1.6', fontSize: '1em' }}
        >
          {/* Render content. Note: You need server-side transformation if content contains HTML/JS not allowed by AMP. */}
          {parse(content)}
        </div>
      </article>

      {/* Basic Footer */}
      <footer style={{ borderTop: '1px solid #ccc', marginTop: '20px', padding: '10px 20px', textAlign: 'center', fontSize: '0.8em' }}>
        <a href={canonicalUrl} style={{ color: '#cc0000', textDecoration: 'none' }}>View Full Article</a>
        <p>&copy; {new Date().getFullYear()} Khabar24Live</p>
      </footer>
    </div>
  );
}

// Re-using static params from the main article page for pre-rendering
export { generateStaticParams } from '../../[slugAndId]/page';