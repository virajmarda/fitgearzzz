import React from 'react';

/**
 * ProductDescriptionFormatter Component (No External Dependencies)
 * Renders HTML formatted product descriptions safely
 */

const ProductDescriptionFormatter = ({ description, className = '' }) => {
  if (!description) {
    return <div className="text-gray-300">No description available</div>;
  }

  // Simple HTML sanitization
  const sanitizeHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Remove script tags and dangerous elements
    const scripts = temp.querySelectorAll('script, style, iframe, object, embed');
    scripts.forEach(el => el.remove());

    // Remove dangerous attributes
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (!['class', 'id', 'style'].includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return temp.innerHTML;
  };

  return (
    <div
      className={`text-gray-300 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
      style={{
        fontSize: '16px',
        lineHeight: '1.6',
      }}
    />
  );
};

export default ProductDescriptionFormatter;
