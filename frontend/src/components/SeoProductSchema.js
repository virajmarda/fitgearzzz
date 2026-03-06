import React from 'react';

const SeoProductSchema = ({
  name,
  description,
  url,
  images = [],
  sku,
  price,
  currency = 'INR',
  availability = 'https://schema.org/InStock',
  ratingValue = null,
  reviewCount = null,
  brand = 'FitGearzzz'
}) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    image: images && images.length > 0 ? images : ['https://fitgearzzz.com/og/fitgearzzz-home-og.jpg'],
    description: description,
    sku: sku,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: currency,
      price: String(price),
      itemCondition: 'https://schema.org/NewCondition',
      availability: availability
    }
  };

  if (ratingValue && reviewCount) {
    schemaData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(ratingValue),
      reviewCount: String(reviewCount)
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SeoProductSchema;
