export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  logoLight: string;
  logoDark: string;
  favicon: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  footerText: string;
  contactEmail: string;
  phone: string;
  address: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  gradientStart: string;
  gradientEnd: string;
}

export interface Theme {
  activePreset: string;
  defaultMode: 'dark' | 'light';
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  borderRadius: string;
  colors: {
    dark: ThemeColors;
    light: ThemeColors;
  };
  presets: Record<string, { name: string; dark: ThemeColors; light: ThemeColors }>;
}

export interface Section {
  _id: string;
  key: string;
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
  isMandatory: boolean;
}

export interface HeroContent {
  _id?: string;
  badge: string;
  badgeStatus: string;
  headline: string;
  highlightText: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  metrics: Array<{ value: string; label: string; colorClass?: string }>;
  previewAppTitle: string;
  previewAppSubtitle: string;
  previewAppUrl: string;
  previewAppImage: string;
  isActive: boolean;
}

export interface AboutContent {
  _id?: string;
  title: string;
  headline: string;
  bio: string;
  avatar: string;
  stats: Array<{ label: string; value: string }>;
  isActive: boolean;
}

export interface ProductItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
  url?: string;
  slug?: string;
  category?: string;
  statusBadge?: string;
  metricHighlight?: string;
  metricLabel?: string;
  tags: string[];
  order: number;
  isActive: boolean;
}

export interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
  badgeColor?: string;
  order: number;
  isActive: boolean;
}

export interface SkillItem {
  _id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  tags?: string[];
  order: number;
  isActive: boolean;
}

export interface ExperienceItem {
  _id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements?: string[];
  order: number;
  isActive: boolean;
}

export interface TestimonialItem {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company?: string;
  avatar?: string;
  initials?: string;
  badgeText?: string;
  badgeColor?: string;
  order: number;
  isActive: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt: string;
  readTime: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  doi?: string;
  seoTitle?: string;
  seoDescription?: string;
  helpfulVotes?: number;
  order: number;
  isActive: boolean;
}

export interface OfferBanner {
  _id: string;
  text: string;
  buttonText?: string;
  buttonUrl?: string;
  image?: string;
  startsAt?: string | null;
  endsAt?: string | null;
  isActive: boolean;
}

export interface SocialLink {
  _id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  projectType: string;
  budget: string;
  company?: string;
  isRead: boolean;
  createdAt: string;
}

export interface PublicSitePayload {
  settings: SiteSettings;
  theme: Theme;
  socials: SocialLink[];
  sections: Section[];
  content: {
    hero: HeroContent | null;
    about: AboutContent | null;
    skills: SkillItem[];
    services: ServiceItem[];
    experience: ExperienceItem[];
    testimonials: TestimonialItem[];
    products: ProductItem[];
    blogs: BlogPost[];
  };
  offerBanner?: OfferBanner | null;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}
