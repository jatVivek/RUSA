import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { PublicSitePayload, AdminUser, ProductItem } from './types';
import { fetchSitePayload, getAdminProfile } from './services/api';
import { AnnouncementBanner } from './components/public/AnnouncementBanner';
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { ClientLogosTicker } from './components/public/ClientLogosTicker';
import { FeaturedProjectsSection } from './components/public/FeaturedProjectsSection';
import { ServicesSection } from './components/public/ServicesSection';
import { AboutSkillsSection } from './components/public/AboutSkillsSection';
import { ExperienceSection } from './components/public/ExperienceSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { BlogSection } from './components/public/BlogSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { CaseStudyModal } from './components/public/CaseStudyModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { Loader2 } from 'lucide-react';
import { AmbientCursorGlow, AmbientOrbs } from './lib/animations';

function PortfolioContent() {
  const { theme, setTheme, mode } = useTheme();
  const [siteData, setSiteData] = useState<PublicSitePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin and modal states
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProductItem | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchSitePayload();
      setSiteData(data);
      if (data.theme) {
        setTheme(data.theme);
      }

      // Sync document metadata
      if (data.settings) {
        document.title = data.settings.seoTitle || data.settings.siteTitle || 'RUSA TECH';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', data.settings.seoDescription || data.settings.tagline || '');
        }

        const faviconUrl = data.settings.favicon || data.settings.logoDark || '/favicon.svg';
        let faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!faviconLink) {
          faviconLink = document.createElement('link');
          faviconLink.rel = 'icon';
          document.head.appendChild(faviconLink);
        }
        faviconLink.href = faviconUrl;
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load portfolio site data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Check existing admin session & route
    getAdminProfile().then((user) => {
      if (user) {
        setAdminUser(user);
        if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
          setIsAdminView(true);
        }
      } else {
        if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
          setShowLoginModal(true);
        }
      }
    });

    const handleRoute = () => {
      if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
        const token = localStorage.getItem('rusatech_admin_token') || localStorage.getItem('synthetix_admin_token');
        if (token) {
          setIsAdminView(true);
        } else {
          setShowLoginModal(true);
        }
      }
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  if (loading && !siteData) {
    return (
      <div className="min-h-screen bg-[#131315] flex flex-col items-center justify-center gap-4 text-[#bcc9cd]">
        <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 flex items-center justify-center animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <div className="font-mono text-xs text-[#869397] tracking-wider uppercase">
          RUSA TECH Engine // Booting Telemetry
        </div>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen bg-[#131315] flex flex-col items-center justify-center p-6 text-center text-[#bcc9cd]">
        <div className="max-w-md space-y-4">
          <h2 className="font-heading text-xl font-bold text-white">Initialization Notice</h2>
          <p className="text-xs font-mono text-[#869397]">{error}</p>
          <button
            onClick={loadData}
            className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 cursor-pointer"
          >
            Retry Fetching Site Payload
          </button>
        </div>
      </div>
    );
  }

  // Admin View Mode
  if (isAdminView && adminUser) {
    return (
      <AdminLayout
        user={adminUser}
        siteData={siteData}
        onRefresh={loadData}
        onExitAdmin={() => {
          setIsAdminView(false);
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />
    );
  }

  // Sort sections by order
  const orderedSections = [...siteData.sections]
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300 selection:bg-[var(--color-primary)] selection:text-black relative">
      {/* Ambient background effects */}
      <AmbientOrbs />
      <AmbientCursorGlow />

      {/* 1. Offer Announcement Banner (Strict visibility check) */}
      <AnnouncementBanner />

      {/* 2. Top Navigation Bar */}
      <Navbar
        settings={siteData.settings}
        onOpenAdmin={() => {
          if (adminUser) {
            setIsAdminView(true);
          } else {
            setShowLoginModal(true);
          }
        }}
        onOpenCaseStudy={() => setSelectedCaseStudy(siteData.content.products[0] || null)}
      />

      {/* 3. Dynamic Section Pipeline */}
      <main className="w-full">
        {orderedSections.map((section) => {
          switch (section.key) {
            case 'hero':
              return (
                <React.Fragment key={section._id}>
                  <HeroSection hero={siteData.content.hero} />
                  <ClientLogosTicker />
                </React.Fragment>
              );

            case 'products':
              return (
                <FeaturedProjectsSection
                  key={section._id}
                  products={siteData.content.products}
                  onOpenCaseStudy={(prod) => setSelectedCaseStudy(prod || null)}
                />
              );

            case 'services':
              return (
                <ServicesSection
                  key={section._id}
                  services={siteData.content.services}
                />
              );

            case 'about':
              return (
                <AboutSkillsSection
                  key={section._id}
                  about={siteData.content.about}
                  skills={[]}
                />
              );

            case 'skills':
              return (
                <AboutSkillsSection
                  key={section._id}
                  about={null}
                  skills={siteData.content.skills}
                />
              );

            case 'experience':
              return (
                <ExperienceSection
                  key={section._id}
                  experience={siteData.content.experience}
                />
              );

            case 'testimonials':
              return (
                <TestimonialsSection
                  key={section._id}
                  testimonials={siteData.content.testimonials}
                />
              );

            case 'blog':
              return (
                <BlogSection
                  key={section._id}
                  blogs={siteData.content.blogs}
                />
              );

            case 'contact':
              return (
                <ContactSection
                  key={section._id}
                  contactEmail={siteData.settings.contactEmail}
                  phone={siteData.settings.phone}
                />
              );

            default:
              return null;
          }
        })}
      </main>

      {/* 4. Footer */}
      <Footer
        settings={siteData.settings}
        socials={siteData.socials}
        onOpenAdminLogin={() => {
          if (adminUser) {
            setIsAdminView(true);
          } else {
            setShowLoginModal(true);
          }
        }}
      />

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          product={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}

      {/* Admin Login Modal */}
      {showLoginModal && (
        <AdminLogin
          onSuccess={(user) => {
            setAdminUser(user);
            setShowLoginModal(false);
            setIsAdminView(true);
          }}
          onCancel={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
