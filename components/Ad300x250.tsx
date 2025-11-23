// components/Ad300x250.tsx
'use client'; // Important for client-side rendering of ads

import Script from 'next/script';
import React from 'react';

const ADSENSE_PUB_ID = 'ca-pub-6466761575770733'; // Use your constant

export function Ad300x250() {
  const adSlot = '5053362651'; // The data-ad-slot for the 300x250 ad

  React.useEffect(() => {
    // This pushes the ad slot to be rendered once the component mounts
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense push failed:", e);
    }
  }, []);

  return (
    // Wrapper to center the ad and apply margin/padding for visual separation
    <div className="my-6 flex justify-center w-full">
      <ins 
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '300px', height: '250px' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={adSlot}
      />
      {/* NOTE: The main AdSense script is already loaded in app/layout.tsx,
        so we only need the push command (handled by useEffect).
      */}
    </div>
  );
}