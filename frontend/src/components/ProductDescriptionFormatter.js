import React from 'react';

const ProductDescriptionFormatter = ({ description, descriptionHtml }) => {
  if (!description && !descriptionHtml) {
    return <div className="text-zinc-400">No description available</div>;
  }

  const htmlContent = descriptionHtml || description;

  const sanitizeAndFormatHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Remove dangerous scripts
    const scripts = temp.querySelectorAll('script, style, iframe, object, embed');
    scripts.forEach(el => el.remove());

    // Process all elements
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(el => {
      // Remove dangerous attributes
      Array.from(el.attributes).forEach(attr => {
        if (!['class', 'id', 'style', 'href', 'src', 'alt', 'title'].includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });

      // Add spacing classes to paragraphs
      if (el.tagName === 'P') {
        el.style.marginBottom = '16px';
        el.style.marginTop = '0';
        el.style.lineHeight = '1.8';
      }

      // Style headings
      if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) {
        el.style.marginTop = '24px';
        el.style.marginBottom = '12px';
        el.style.fontWeight = '700';
        el.style.color = '#ffffff';
      }

      // Style lists
      if (['UL', 'OL'].includes(el.tagName)) {
        el.style.marginLeft = '20px';
        el.style.marginBottom = '16px';
        el.style.marginTop = '0';
      }

      // Style list items
      if (el.tagName === 'LI') {
        el.style.marginBottom = '8px';
        el.style.lineHeight = '1.8';
      }

      // Style links
      if (el.tagName === 'A') {
        el.style.color = '#ea580c';
        el.style.textDecoration = 'underline';
        el.style.fontWeight = '500';
      }

      // Style strong/bold
      if (['STRONG', 'B'].includes(el.tagName)) {
        el.style.fontWeight = '700';
        el.style.color = '#ffffff';
      }

      // Style emphasis/italic
      if (['EM', 'I'].includes(el.tagName)) {
        el.style.fontStyle = 'italic';
      }

      // Style blockquotes
      if (el.tagName === 'BLOCKQUOTE') {
        el.style.borderLeft = '4px solid #ea580c';
        el.style.paddingLeft = '16px';
        el.style.marginLeft = '0';
        el.style.marginBottom = '16px';
        el.style.marginTop = '16px';
        el.style.color = '#d1d5db';
        el.style.fontStyle = 'italic';
      }

      // Style line breaks
      if (el.tagName === 'BR') {
        el.style.lineHeight = '2';
      }

      // Add margin to divs
      if (el.tagName === 'DIV') {
        el.style.marginBottom = '12px';
      }
    });

    return temp.innerHTML;
  };

  return (
    <div
      className="product-description text-zinc-300"
      dangerouslySetInnerHTML={{
        __html: sanitizeAndFormatHtml(htmlContent),
      }}
      style={{
        fontSize: '15px',
        lineHeight: '1.8',
        letterSpacing: '0.3px',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        color: '#d1d5db',
      }}
    >
    </div>
  );
};

export default ProductDescriptionFormatter;
