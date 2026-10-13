export { Admin } from './Admin.js';
export { SiteSettings } from './SiteSettings.js';
export { Theme, PRESET_PALETTES } from './Theme.js';
export { SocialLink } from './SocialLink.js';
export { Section, MANDATORY_SECTION_KEYS } from './Section.js';
export { Hero } from './Hero.js';
export { About } from './About.js';
export { Skill } from './Skill.js';
export { Service } from './Service.js';
export { Experience } from './Experience.js';
export { Testimonial } from './Testimonial.js';
export { Product } from './Product.js';
export { Blog } from './Blog.js';
export { OfferBanner } from './OfferBanner.js';
export { ContactMessage } from './ContactMessage.js';

import { Admin } from './Admin.js';
import { SiteSettings } from './SiteSettings.js';
import { Theme } from './Theme.js';
import { SocialLink } from './SocialLink.js';
import { Section } from './Section.js';
import { Hero } from './Hero.js';
import { About } from './About.js';
import { Skill } from './Skill.js';
import { Service } from './Service.js';
import { Experience } from './Experience.js';
import { Testimonial } from './Testimonial.js';
import { Product } from './Product.js';
import { Blog } from './Blog.js';
import { OfferBanner } from './OfferBanner.js';
import { ContactMessage } from './ContactMessage.js';

export const MODEL_REGISTRY = {
  admin: Admin,
  sitesettings: SiteSettings,
  theme: Theme,
  sociallink: SocialLink,
  section: Section,
  hero: Hero,
  about: About,
  skill: Skill,
  service: Service,
  experience: Experience,
  testimonial: Testimonial,
  product: Product,
  blog: Blog,
  offerbanner: OfferBanner,
  contactmessage: ContactMessage,
};
