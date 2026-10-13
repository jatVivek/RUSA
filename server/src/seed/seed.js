import { connectDB } from '../config/db.js';
import { ENV } from '../config/env.js';
import { hashPassword } from '../utils/password.js';
import {
  Admin,
  SiteSettings,
  Theme,
  Section,
  Hero,
  About,
  Product,
  Service,
  Skill,
  Testimonial,
  Experience,
  Blog,
  OfferBanner,
  SocialLink,
  ContactMessage,
} from '../models/index.js';
import {
  initialSiteSettings,
  initialTheme,
  initialSections,
  initialHero,
  initialAbout,
  initialProducts,
  initialServices,
  initialSkills,
  initialTestimonials,
  initialExperiences,
  initialBlogs,
  initialOfferBanner,
  initialSocialLinks,
  initialContactMessages,
} from './seedData.js';

export async function runSeed(force = false) {
  console.log('🌱 Starting database seed script...');
  await connectDB();

  // 1. Admin
  const existingAdmin = await Admin.findOne({ email: ENV.DEFAULT_ADMIN_EMAIL });
  if (!existingAdmin || force) {
    if (existingAdmin && force) {
      await Admin.deleteOne({ email: ENV.DEFAULT_ADMIN_EMAIL });
    }
    const passwordHash = await hashPassword(ENV.DEFAULT_ADMIN_PASSWORD);
    await Admin.create({
      name: ENV.DEFAULT_ADMIN_NAME,
      email: ENV.DEFAULT_ADMIN_EMAIL,
      passwordHash,
      role: 'superadmin',
    });
    console.log(` Created default admin: ${ENV.DEFAULT_ADMIN_EMAIL}`);
  } else {
    console.log(` Admin already exists: ${ENV.DEFAULT_ADMIN_EMAIL}`);
  }

  // 2. SiteSettings
  const existingSettings = await SiteSettings.findOne();
  if (!existingSettings || force) {
    await SiteSettings.findOneAndUpdate({}, initialSiteSettings, { upsert: true, new: true });
    console.log(' Created default SiteSettings');
  }

  // 3. Theme
  const existingTheme = await Theme.findOne();
  if (!existingTheme || force) {
    await Theme.findOneAndUpdate({}, initialTheme, { upsert: true, new: true });
    console.log(' Created default Theme with 4 preset palettes');
  }

  // 4. Sections
  const sectionCount = await Section.countDocuments();
  if (sectionCount === 0 || force) {
    await Section.deleteMany({});
    await Section.create(initialSections);
    console.log(` Created ${initialSections.length} mandatory and default sections`);
  }

  // 5. Hero
  const heroCount = await Hero.countDocuments();
  if (heroCount === 0 || force) {
    await Hero.deleteMany({});
    await Hero.create(initialHero);
    console.log(' Created Hero section content');
  }

  // 6. About
  const aboutCount = await About.countDocuments();
  if (aboutCount === 0 || force) {
    await About.deleteMany({});
    await About.create(initialAbout);
    console.log(' Created About section content');
  }

  // 7. Products
  const prodCount = await Product.countDocuments();
  if (prodCount === 0 || force) {
    await Product.deleteMany({});
    await Product.create(initialProducts);
    console.log(` Created ${initialProducts.length} showcase products`);
  }

  // 8. Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0 || force) {
    await Service.deleteMany({});
    await Service.create(initialServices);
    console.log(` Created ${initialServices.length} agency services`);
  }

  // 9. Skills
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0 || force) {
    await Skill.deleteMany({});
    await Skill.create(initialSkills);
    console.log(` Created ${initialSkills.length} tech stack skills`);
  }

  // 10. Testimonials
  const testCount = await Testimonial.countDocuments();
  if (testCount === 0 || force) {
    await Testimonial.deleteMany({});
    await Testimonial.create(initialTestimonials);
    console.log(` Created ${initialTestimonials.length} client testimonials`);
  }

  // 11. Experience
  const expCount = await Experience.countDocuments();
  if (expCount === 0 || force) {
    await Experience.deleteMany({});
    await Experience.create(initialExperiences);
    console.log(` Created ${initialExperiences.length} process milestones`);
  }

  // 12. Blogs
  const blogCount = await Blog.countDocuments();
  if (blogCount === 0 || force) {
    await Blog.deleteMany({});
    await Blog.create(initialBlogs);
    console.log(` Created ${initialBlogs.length} engineering blog posts`);
  }

  // 13. OfferBanner
  const offerCount = await OfferBanner.countDocuments();
  if (offerCount === 0 || force) {
    await OfferBanner.deleteMany({});
    await OfferBanner.create(initialOfferBanner);
    console.log(' Created top announcement offer banner');
  }

  // 14. SocialLinks
  const socialCount = await SocialLink.countDocuments();
  if (socialCount === 0 || force) {
    await SocialLink.deleteMany({});
    await SocialLink.create(initialSocialLinks);
    console.log(` Created ${initialSocialLinks.length} social links`);
  }

  // 15. ContactMessages
  const msgCount = await ContactMessage.countDocuments();
  if (msgCount === 0 || force) {
    await ContactMessage.deleteMany({});
    await ContactMessage.create(initialContactMessages);
    console.log(` Created ${initialContactMessages.length} inbox inquiries`);
  }

  console.log(' Database seed complete!\n');
}

// Run directly if called as a script
if (process.argv[1]?.endsWith('seed.js')) {
  runSeed(process.argv.includes('--force'))
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}
