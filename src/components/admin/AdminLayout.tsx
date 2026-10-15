import React, { useState } from 'react';
import { PublicSitePayload, AdminUser } from '../../types';
import { logoutAdmin } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { SiteSettingsManager } from './SiteSettingsManager';
import { ThemeManager } from './ThemeManager';
import { SectionsManager } from './SectionsManager';
import { HeroEditor } from './HeroEditor';
import { AboutEditor } from './AboutEditor';
import { ProductsManager } from './ProductsManager';
import { BlogManager } from './BlogManager';
import { ServicesManager } from './ServicesManager';
import { SkillsManager } from './SkillsManager';
import { ExperienceManager } from './ExperienceManager';
import { TestimonialsManager } from './TestimonialsManager';
import { OfferBannerManager } from './OfferBannerManager';
import { SocialLinksManager } from './SocialLinksManager';
import { MessagesInbox } from './MessagesInbox';
import { ChangePasswordModal } from './ChangePasswordModal';
import {
  LayoutDashboard,
  Settings,
  Palette,
  Layers,
  Sparkles,
  UserCheck,
  FolderKanban,
  BookOpen,
  Zap,
  Cpu,
  Briefcase,
  Quote,
  Megaphone,
  Share2,
  Inbox,
  LogOut,
  ExternalLink,
  KeyRound,
  Sun,
  Moon,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface AdminLayoutProps {
  user: AdminUser;
  siteData: PublicSitePayload;
  onRefresh: () => void;
  onExitAdmin: () => void;
}

type TabKey =
  | 'overview'
  | 'settings'
  | 'theme'
  | 'sections'
  | 'hero'
  | 'about'
  | 'products'
  | 'blogs'
  | 'services'
  | 'skills'
  | 'experience'
  | 'testimonials'
  | 'offer'
  | 'socials'
  | 'messages';

export function AdminLayout({
  user,
  siteData,
  onRefresh,
  onExitAdmin,
}: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const { mode, toggleMode } = useTheme();

  const handleLogout = async () => {
    await logoutAdmin();
    onExitAdmin();
  };

  const navItems: Array<{ key: TabKey; label: string; icon: React.ReactNode; badge?: string }> = [
    { key: 'overview', label: 'Telemetry Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'settings', label: 'Site & Branding', icon: <Settings className="w-4 h-4" /> },
    { key: 'theme', label: 'Theme Engine', icon: <Palette className="w-4 h-4" /> },
    { key: 'sections', label: 'Section Hierarchy', icon: <Layers className="w-4 h-4" /> },
    { key: 'hero', label: 'Hero Showcase', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'about', label: 'About & Philosophy', icon: <UserCheck className="w-4 h-4" /> },
    { key: 'products', label: 'Built Products', icon: <FolderKanban className="w-4 h-4" />, badge: `${siteData.content.products.length}` },
    { key: 'blogs', label: 'Technical Papers', icon: <BookOpen className="w-4 h-4" />, badge: `${siteData.content.blogs.length}` },
    { key: 'services', label: 'Capabilities / Services', icon: <Zap className="w-4 h-4" />, badge: `${siteData.content.services.length}` },
    { key: 'skills', label: 'Technical Stack', icon: <Cpu className="w-4 h-4" />, badge: `${siteData.content.skills.length}` },
    { key: 'experience', label: 'Tenure & Milestones', icon: <Briefcase className="w-4 h-4" />, badge: `${siteData.content.experience.length}` },
    { key: 'testimonials', label: 'Client Endorsements', icon: <Quote className="w-4 h-4" />, badge: `${siteData.content.testimonials.length}` },
    { key: 'offer', label: 'Announcement Banner', icon: <Megaphone className="w-4 h-4" /> },
    { key: 'socials', label: 'Social Channels', icon: <Share2 className="w-4 h-4" />, badge: `${siteData.socials.length}` },
    { key: 'messages', label: 'Scoping Leads Inbox', icon: <Inbox className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#141416] text-[#bcc9cd] flex flex-col antialiased">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-[#3d494c]/40 bg-[#1b1b1d]/90 backdrop-blur-md sticky top-0 z-40 px-5 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-black font-bold flex items-center justify-center font-mono">
              R
            </div>
            <div>
              <span className="font-heading font-bold text-white text-base">
                RUSA TECH
              </span>
              <span className="ml-2 text-[10px] font-mono text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded border border-[var(--color-primary)]/20">
                CMS KERNEL
              </span>
            </div>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-3">
          {/* Live Theme Toggle */}
          <button
            onClick={toggleMode}
            className="p-2 rounded-xl bg-[#201f22] hover:bg-[#2a2a2c] text-[#bcc9cd] hover:text-white border border-[#3d494c]/40 transition-colors cursor-pointer"
            title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} theme mode`}
          >
            {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* View Public Site */}
          <button
            onClick={onExitAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#201f22] hover:bg-[#2a2a2c] text-xs font-mono text-[#bcc9cd] hover:text-white border border-[#3d494c]/40 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="hidden sm:inline">View Public Site</span>
          </button>

          {/* User profile dropdown button */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#3d494c]/40">
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="p-2 rounded-xl bg-[#201f22] hover:bg-[#2a2a2c] text-[#bcc9cd] hover:text-white border border-[#3d494c]/40 cursor-pointer"
              title="Change Password"
            >
              <KeyRound className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
              title="Log out session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-[#3d494c]/40 bg-[#1b1b1d]/50 p-4 space-y-1 overflow-y-auto hidden md:block shrink-0">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#869397] px-3 py-2 font-semibold">
            System Modules
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'text-[#869397] hover:text-white hover:bg-[#201f22]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-black/20 text-black' : 'bg-[#2a2a2c] text-[#bcc9cd]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#141416]">
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-5xl">
              <div className="border-b border-[#3d494c]/30 pb-5">
                <h2 className="font-heading text-2xl font-bold text-white">
                  RUSA TECH Control Center // System Telemetry
                </h2>
                <p className="text-xs font-mono text-[#869397] mt-1">
                  Active database collections, live content stats, and system integrity status.
                </p>
              </div>

              {/* Status Metric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#201f22] border border-[#3d494c]/40 space-y-2">
                  <span className="text-xs font-mono text-[#869397]">Production Status</span>
                  <div className="text-xl font-mono font-bold text-[#4edea3] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse" />
                    <span>ONLINE (200 OK)</span>
                  </div>
                  <div className="text-[11px] text-[#869397]">All APIs responding in &lt;10ms</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#201f22] border border-[#3d494c]/40 space-y-2">
                  <span className="text-xs font-mono text-[#869397]">Built Case Studies</span>
                  <div className="text-2xl font-mono font-bold text-[var(--color-primary)]">
                    {siteData.content.products.length}
                  </div>
                  <div className="text-[11px] text-[#869397]">
                    {siteData.content.products.filter((p) => p.isActive).length} currently active on site
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#201f22] border border-[#3d494c]/40 space-y-2">
                  <span className="text-xs font-mono text-[#869397]">Published Papers</span>
                  <div className="text-2xl font-mono font-bold text-[var(--color-secondary)]">
                    {siteData.content.blogs.length}
                  </div>
                  <div className="text-[11px] text-[#869397]">
                    {siteData.content.blogs.filter((b) => b.isActive && b.status === 'published').length} public research reports
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#201f22] border border-[#3d494c]/40 space-y-2">
                  <span className="text-xs font-mono text-[#869397]">Theme Palette</span>
                  <div className="text-base font-mono font-bold text-white truncate">
                    {siteData.theme?.activePreset || 'Obsidian Aurora'}
                  </div>
                  <div className="text-[11px] text-[#869397]">Dynamic CSS engine live</div>
                </div>
              </div>

              {/* Quick Jump Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div
                  onClick={() => setActiveTab('theme')}
                  className="p-6 rounded-2xl bg-[#201f22] hover:bg-[#252427] border border-[#3d494c]/40 hover:border-[var(--color-primary)] transition-all cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-base group-hover:text-[var(--color-primary)]">
                    Theme Engine
                  </h3>
                  <p className="text-xs text-[#869397] leading-relaxed">
                    Instantly swap to Cyber Emerald, Solar Flare, or Cobalt Pro presets, or fine-tune individual color channels.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('sections')}
                  className="p-6 rounded-2xl bg-[#201f22] hover:bg-[#252427] border border-[#3d494c]/40 hover:border-[var(--color-primary)] transition-all cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-base group-hover:text-[var(--color-primary)]">
                    Section Order & Toggles
                  </h3>
                  <p className="text-xs text-[#869397] leading-relaxed">
                    Reorder Hero, Work, Services, Bio, Whitepapers, and Testimonials. Turning any off hides it from the public payload.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('messages')}
                  className="p-6 rounded-2xl bg-[#201f22] hover:bg-[#252427] border border-[#3d494c]/40 hover:border-[var(--color-primary)] transition-all cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 text-[#4edea3] flex items-center justify-center">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-base group-hover:text-[var(--color-primary)]">
                    Inbound Leads Inbox
                  </h3>
                  <p className="text-xs text-[#869397] leading-relaxed">
                    Review prospective client briefs, proposed architectures, project types, and budget tiers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <SiteSettingsManager settings={siteData.settings} onRefresh={onRefresh} />
          )}

          {activeTab === 'theme' && (
            <ThemeManager theme={siteData.theme} onRefresh={onRefresh} />
          )}

          {activeTab === 'sections' && (
            <SectionsManager sections={siteData.sections} onRefresh={onRefresh} />
          )}

          {activeTab === 'hero' && (
            <HeroEditor hero={siteData.content.hero} onRefresh={onRefresh} />
          )}

          {activeTab === 'about' && (
            <AboutEditor about={siteData.content.about} onRefresh={onRefresh} />
          )}

          {activeTab === 'products' && (
            <ProductsManager products={siteData.content.products} onRefresh={onRefresh} />
          )}

          {activeTab === 'blogs' && (
            <BlogManager blogs={siteData.content.blogs} onRefresh={onRefresh} />
          )}

          {activeTab === 'services' && (
            <ServicesManager services={siteData.content.services} onRefresh={onRefresh} />
          )}

          {activeTab === 'skills' && (
            <SkillsManager skills={siteData.content.skills} onRefresh={onRefresh} />
          )}

          {activeTab === 'experience' && (
            <ExperienceManager experience={siteData.content.experience} onRefresh={onRefresh} />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsManager testimonials={siteData.content.testimonials} onRefresh={onRefresh} />
          )}

          {activeTab === 'offer' && (
            <OfferBannerManager onRefresh={onRefresh} />
          )}

          {activeTab === 'socials' && (
            <SocialLinksManager socials={siteData.socials} onRefresh={onRefresh} />
          )}

          {activeTab === 'messages' && <MessagesInbox />}
        </main>
      </div>

      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </div>
  );
}
