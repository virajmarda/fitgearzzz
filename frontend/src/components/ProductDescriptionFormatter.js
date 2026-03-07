import React from 'react';

const ProductDescriptionFormatter = ({ description, descriptionHtml }) => {
  if (!description && !descriptionHtml) {
    return <div className="text-zinc-400">No description available</div>;
  }

  // Use HTML if available (from Shopify), otherwise plain text
  const htmlContent = descriptionHtml || description;

  const sanitizeHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Remove dangerous scripts
    const scripts = temp.querySelectorAll('script, style, iframe, object, embed');
    scripts.forEach(el => el.remove());

    // Remove dangerous attributes but keep safe ones
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (!['class', 'id', 'style', 'href', 'src', 'alt', 'title'].includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return temp.innerHTML;
  };

  return (
    <div
      className="text-sm sm:text-base text-zinc-300 leading-relaxed"
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(htmlContent),
      }}
      style={{
        fontSize: '16px',
        lineHeight: '1.75',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
    />
  );
};

export default ProductDescriptionFormatter;
