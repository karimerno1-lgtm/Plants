import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { CookieBanner } from './components/legal/CookieBanner';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

import { HomePage } from './views/HomePage';
import { ToolsHubPage } from './views/ToolsHubPage';
import { ToolDetailPage } from './views/ToolDetailPage';
import { PlantsHubPage } from './views/PlantsHubPage';
import { PlantDetailPage } from './views/PlantDetailPage';
import { GuidesHubPage } from './views/GuidesHubPage';
import { GuideDetailPage } from './views/GuideDetailPage';
import { AboutPage } from './views/AboutPage';
import { ContactPage } from './views/ContactPage';
import { PrivacyPolicyPage } from './views/PrivacyPolicyPage';
import { TermsPage } from './views/TermsPage';
import { DisclaimerPage } from './views/DisclaimerPage';
import { CookiePolicyPage } from './views/CookiePolicyPage';
import { OfflinePage } from './views/OfflinePage';

import { TOOLS_DATA } from './data/tools';
import { PLANTS_DATA } from './data/plants';
import { GUIDES_DATA } from './data/guides';

import { resolvePageSeo, applySeoMetadata } from './utils/seo';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Handle browser back and forward button events
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Page Title, Canonical, Meta Description, OG, and JSON-LD on route change
  useEffect(() => {
    const seo = resolvePageSeo(currentPath);
    applySeoMetadata(seo);
  }, [currentPath]);

  // Navigate handler that wraps pushState
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // View routing resolution
  const renderCurrentView = () => {
    // 1. Homepage
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} onOpenSearch={() => setSearchModalOpen(true)} />;
    }

    // 2. Tools
    if (currentPath === '/tools') {
      return <ToolsHubPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/tools/')) {
      const slug = currentPath.replace('/tools/', '').replace(/\/$/, '');
      return <ToolDetailPage toolSlug={slug} onNavigate={navigate} />;
    }

    // 3. Plants
    if (currentPath === '/plants') {
      return <PlantsHubPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/plants/')) {
      const slug = currentPath.replace('/plants/', '').replace(/\/$/, '');
      return <PlantDetailPage plantSlug={slug} onNavigate={navigate} />;
    }

    // 4. Guides
    if (currentPath === '/guides') {
      return <GuidesHubPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/guides/')) {
      const slug = currentPath.replace('/guides/', '').replace(/\/$/, '');
      return <GuideDetailPage guideSlug={slug} onNavigate={navigate} />;
    }

    // 5. Legal & Company
    if (currentPath === '/about') return <AboutPage onNavigate={navigate} />;
    if (currentPath === '/contact') return <ContactPage />;
    if (currentPath === '/privacy-policy') return <PrivacyPolicyPage />;
    if (currentPath === '/terms') return <TermsPage />;
    if (currentPath === '/disclaimer') return <DisclaimerPage />;
    if (currentPath === '/cookie-policy') return <CookiePolicyPage />;
    if (currentPath === '/offline') return <OfflinePage onNavigate={navigate} />;

    // Default fallback to Homepage
    return <HomePage onNavigate={navigate} onOpenSearch={() => setSearchModalOpen(true)} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7F0] text-stone-900 font-sans selection:bg-emerald-900 selection:text-emerald-50">
      {/* Top Main Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {renderCurrentView()}
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigate}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onNavigate={navigate} />

      {/* PWA Offline Connection Indicator */}
      <OfflineIndicator />

      {/* Professional Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
