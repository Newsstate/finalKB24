// components/RichTextRenderer.tsx

import React from 'react';
import parse from 'html-react-parser';

interface RichTextRendererProps {
  htmlContent: string;
  insertAfterParagraph?: number; // 1-indexed paragraph number
  insertionComponent?: React.ReactNode;
}

export function RichTextRenderer({ htmlContent, insertAfterParagraph = -1, insertionComponent }: RichTextRendererProps) {
  // Split the HTML content by paragraph tags
  // This approach is more robust for splitting paragraphs
  const paragraphs = htmlContent.split(/<\/?p[^>]*>/).filter(Boolean); // Split by <p> or </p>, filter out empty strings

  const renderContent = paragraphs.map((paragraphText, index) => {
    const paragraphKey = `para-${index}`;
    const paragraphElement = <p key={paragraphKey}>{parse(paragraphText.trim())}</p>;

    // Check if we should insert the component after this paragraph
    // Note: index is 0-based, insertAfterParagraph is 1-based
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