
import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

const Meta = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author = "Adel's Store",
  robots = 'index, follow'
}) => {
  const siteName = "Adel's Store";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Discover amazing products at unbeatable prices. Quality guaranteed with fast shipping and excellent customer service.';
  const defaultKeywords = 'online shopping, e-commerce, electronics, fashion, home & garden, sports, books, toys, best prices, fast shipping';
  const defaultImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:site" content="@adelstore" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url || window.location.href} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": "https://adelstore.com",
          "logo": "https://adelstore.com/logo.png",
          "description": defaultDescription,
          "sameAs": [
            "https://facebook.com/adelstore",
            "https://twitter.com/adelstore",
            "https://instagram.com/adelstore"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-0123",
            "contactType": "customer service",
            "availableLanguage": "English"
          }
        })}
      </script>
    </Helmet>
  );
};

// Specialized message components for common use cases
export const SuccessMessage = ({ children, ...props }) => (
  <Message variant="success" {...props}>
    {children}
  </Message>
);

export const ErrorMessage = ({ children, ...props }) => (
  <Message variant="danger" {...props}>
    {children}
  </Message>
);

export const WarningMessage = ({ children, ...props }) => (
  <Message variant="warning" {...props}>
    {children}
  </Message>
);

export const InfoMessage = ({ children, ...props }) => (
  <Message variant="info" {...props}>
    {children}
  </Message>
);

Meta.defaultProps = {
  title: "Welcome To Adel's Store",
  description: 'Discover amazing products at unbeatable prices. Quality guaranteed with fast shipping and excellent customer service.',
  keywords: 'online shopping, e-commerce, electronics, fashion, home & garden, sports, books, toys, best prices, fast shipping',
  type: 'website',
  author: "Adel's Store",
  robots: 'index, follow'
};

export default Meta;
