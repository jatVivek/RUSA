import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Valid email address is required'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(5000),
  projectType: z.string().optional().default('SaaS Web App'),
  budget: z.string().optional().default('$15k – $30k'),
  company: z.string().optional().default(''),
});

export const reorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number().int(),
    })
  ).min(1, 'At least one item required for reordering'),
});

export const toggleSchema = z.object({
  isActive: z.boolean().optional(),
});

export const siteSettingsSchema = z.object({
  siteTitle: z.string().min(1).optional(),
  tagline: z.string().optional(),
  logoLight: z.string().optional(),
  logoDark: z.string().optional(),
  favicon: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
  footerText: z.string().optional(),
  contactEmail: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const themeUpdateSchema = z.object({
  activePreset: z.string().optional(),
  defaultMode: z.enum(['dark', 'light']).optional(),
  fontHeading: z.string().optional(),
  fontBody: z.string().optional(),
  borderRadius: z.string().optional(),
  colors: z
    .object({
      dark: z.record(z.string()).optional(),
      light: z.record(z.string()).optional(),
    })
    .optional(),
});

export const productSchema = z.object({
  title: z.string().min(2, 'Product title is required'),
  description: z.string().min(5, 'Description is required'),
  images: z.array(z.string()).optional().default([]),
  url: z.string().optional().default(''),
  slug: z.string().optional(),
  category: z.string().optional(),
  statusBadge: z.string().optional(),
  metricHighlight: z.string().optional(),
  metricLabel: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  order: z.number().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const blogSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  excerpt: z.string().min(5, 'Excerpt is required'),
  content: z.string().min(10, 'Content is required'),
  coverImage: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(['draft', 'published']).optional().default('published'),
  publishedAt: z.string().or(z.date()).optional(),
  readTime: z.string().optional().default('10 min read'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  order: z.number().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const offerBannerSchema = z.object({
  text: z.string().min(3, 'Banner text is required'),
  buttonText: z.string().optional().default(''),
  buttonUrl: z.string().optional().default(''),
  image: z.string().optional().default(''),
  startsAt: z.string().nullable().optional(),
  endsAt: z.string().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Must be a valid URL'),
  icon: z.string().optional().default('link'),
  order: z.number().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const sectionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional().default(''),
  order: z.number().optional().default(0),
  isActive: z.boolean().optional().default(true),
});
