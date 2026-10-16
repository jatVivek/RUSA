import {
  SiteSettings,
  Theme,
  SocialLink,
  Section,
  Hero,
  About,
  Skill,
  Service,
  Experience,
  Testimonial,
  Product,
  Blog,
  OfferBanner,
  ContactMessage,
} from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { sendContactNotification } from '../utils/mailer.js';

export async function getSite(req, res, next) {
  try {
    const [
      settings,
      theme,
      socials,
      sections,
      hero,
      about,
      skills,
      services,
      experience,
      testimonials,
      products,
      blogs,
    ] = await Promise.all([
      SiteSettings.findOne(),
      Theme.findOne(),
      SocialLink.find({ isActive: true }).sort({ order: 1 }),
      Section.find({ isActive: true }).sort({ order: 1 }),
      Hero.findOne({ isActive: true }),
      About.findOne({ isActive: true }),
      Skill.find({ isActive: true }).sort({ order: 1 }),
      Service.find({ isActive: true }).sort({ order: 1 }),
      Experience.find({ isActive: true }).sort({ order: 1 }),
      Testimonial.find({ isActive: true }).sort({ order: 1 }),
      Product.find({ isActive: true }).sort({ order: 1 }),
      Blog.find({ isActive: true, status: 'published' }).sort({ publishedAt: -1 }).limit(6),
    ]);

    // Active sections map for quick lookup
    const activeSectionKeys = new Set((sections || []).map((s) => s.key));

    const sitePayload = {
      settings: settings || {},
      theme: theme || {},
      socials: socials || [],
      sections: sections || [],
      // Section-level content (only included if section itself is active AND item is active)
      content: {
        hero: activeSectionKeys.has('hero') ? hero || null : null,
        about: activeSectionKeys.has('about') ? about || null : null,
        skills: activeSectionKeys.has('skills') ? skills || [] : [],
        services: activeSectionKeys.has('services') ? services || [] : [],
        experience: activeSectionKeys.has('experience') ? experience || [] : [],
        testimonials: activeSectionKeys.has('testimonials') ? testimonials || [] : [],
        products: activeSectionKeys.has('products') ? products || [] : [],
        blogs: activeSectionKeys.has('blog') ? blogs || [] : [],
      },
    };

    // Ensure freshness so admin updates and logo changes immediately show across the site
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    return successResponse(res, sitePayload, 'Site configuration retrieved successfully');
  } catch (err) {
    next(err);
  }
}

export async function getBlogs(req, res, next) {
  try {
    const blogs = await Blog.find({ isActive: true, status: 'published' }).sort({ publishedAt: -1 });
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    return successResponse(res, blogs || [], 'Published blog posts retrieved');
  } catch (err) {
    next(err);
  }
}

export async function getBlogBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, isActive: true, status: 'published' });
    if (!blog) {
      return errorResponse(res, 'Blog post not found or not published', 404);
    }
    res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=120');
    return successResponse(res, blog, 'Blog post retrieved');
  } catch (err) {
    next(err);
  }
}

export async function getProducts(req, res, next) {
  try {
    const products = await Product.find({ isActive: true }).sort({ order: 1 });
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    return successResponse(res, products || [], 'Active products retrieved');
  } catch (err) {
    next(err);
  }
}

export async function getOffer(req, res, next) {
  try {
    const banner = await OfferBanner.findOne({ isActive: true });

    if (!banner) {
      return res.status(204).json({ success: true, data: null, message: 'No active offer' });
    }

    const now = new Date();
    if (banner.startsAt && new Date(banner.startsAt) > now) {
      return res.status(204).json({ success: true, data: null, message: 'Offer has not started yet' });
    }
    if (banner.endsAt && new Date(banner.endsAt) < now) {
      return res.status(204).json({ success: true, data: null, message: 'Offer has expired' });
    }

    res.setHeader('Cache-Control', 'public, max-age=60');
    return successResponse(res, banner, 'Active offer banner retrieved');
  } catch (err) {
    next(err);
  }
}

export async function submitContact(req, res, next) {
  try {
    const { name, email, message, projectType, budget, company } = req.body;

    const contactEntry = await ContactMessage.create({
      name,
      email,
      message,
      projectType: projectType || 'SaaS Web App',
      budget: budget || '$15k – $30k',
      company: company || '',
      isRead: false,
    });

    // Notify administrator
    await sendContactNotification({ name, email, message, projectType, budget });

    return successResponse(
      res,
      { received: true },
      'Project brief received! Our lead architect will be in touch within 24 hours.',
      201
    );
  } catch (err) {
    next(err);
  }
}
