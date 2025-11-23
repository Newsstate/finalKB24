// components/RichTextRenderer.tsx

import React from 'react';
import parse from 'html-react-parser';

interface RichTextRendererProps {
  htmlContent: string;
  insertAfterParagraph?: number; // 1-indexed paragraph number
  insertionComponent?: React.ReactNode;
}

// Ensure this uses 'export function'
export function RichTextRenderer({ htmlContent, insertAfterParagraph = -1, insertionComponent }: RichTextRendererProps) {
  // Split the HTML content by paragraph tags
  // The regex ensures we handle various <p> tag formats and extract the inner text.
  // We filter out the empty strings from the split.
  const paragraphs = htmlContent.split(/<\/?p[^>]*>/).filter(Boolean).map(s => s.trim());

  const renderContent = paragraphs.map((paragraphText, index) => {
    const paragraphKey = `para-${index}`;
    // Re-wrap the parsed text in a <p> tag
    const paragraphElement = <p key={paragraphKey}>{parse(paragraphText)}</p>;

    // Check if we should insert the component after this paragraph
    // index is 0-based, insertAfterParagraph is 1-based (e.g., after 3rd para means index === 2)
    if (insertAfterParagraph !== -1 && index + 1 === insertAfterParagraph) {
      return (
        <React.Fragment key={`fragment-${index}`}>
          {paragraphElement}
          {insertionComponent}
        </React.Fragment>
      );
    }
    return paragraphElement;
  });

  return <>{renderContent}</>;
}