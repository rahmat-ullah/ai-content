import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import './App.css';

// Layout Components
const Header = lazy(() => import('./components/layout/Header'));
const Footer = lazy(() => import('./components/layout/Footer'));

// Section Components
const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const FeatureSection = lazy(() => import('./components/sections/FeatureSection'));
const TestimonialSection = lazy(() => import('./components/sections/TestimonialSection'));
const PricingSection = lazy(() => import('./components/sections/PricingSection'));
const LogoSection = lazy(() => import('./components/sections/LogoSection'));
const FAQSection = lazy(() => import('./components/sections/FAQSection'));
const NewsletterSection = lazy(() => import('./components/sections/NewsletterSection'));

// UI Components
const FloatingActionButton = lazy(() => import('./components/ui/FloatingActionButton'));

// CMS Components
const CMSPanel = lazy(() => import('./components/cms/CMSPanel'));

// Loading Component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse flex space-x-2">
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Helmet>
        <title>AI Content Generator | Create High-Quality Content with AI</title>
        <meta name="description" content="Transform your content strategy with our AI-powered content generator. Create engaging, SEO-optimized content in seconds for blogs, social media, emails, and more." />
        <meta name="keywords" content="AI content generator, content creation, AI writing, content marketing, SEO content" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="AI Content Generator | Create High-Quality Content with AI" />
        <meta property="og:description" content="Transform your content strategy with our AI-powered content generator. Create engaging, SEO-optimized content in seconds." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ai-content-generator.com" />
        <meta property="og:image" content="https://ai-content-generator.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Content Generator | Create High-Quality Content with AI" />
        <meta name="twitter:description" content="Transform your content strategy with our AI-powered content generator. Create engaging, SEO-optimized content in seconds." />
        <meta name="twitter:image" content="https://ai-content-generator.com/twitter-image.jpg" />
        <link rel="canonical" href="https://ai-content-generator.com" />
        
        {/* Schema.org markup for rich snippets */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AI Content Generator",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "19",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1024"
              }
            }
          `}
        </script>
      </Helmet>

      <Suspense fallback={<LoadingFallback />}>
        <Header />
        <main>
          <HeroSection />
          <FeatureSection />
          <TestimonialSection />
          <PricingSection />
          <LogoSection />
          <FAQSection />
          <NewsletterSection />
        </main>
        <Footer />
        <FloatingActionButton />
        <CMSPanel />
      </Suspense>
    </>
  );
}

export default App;
