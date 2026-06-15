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
  brand = 'FitGearzzz',
    categoryName = '',
  handle = '',
}) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
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

    // BreadcrumbList schema for rich results
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://fitgearzzz.com';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...(categoryName ? [{ '@type': 'ListItem', position: 2, name: categoryName, item: `${siteUrl}/products` }] : []),
      { '@type': 'ListItem', position: categoryName ? 3 : 2, name: name, item: url || `${siteUrl}/products/${handle}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
};

export default SeoProductSchema;
