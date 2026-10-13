import { ENV } from '../config/env.js';

export async function sendContactNotification({ name, email, message, projectType, budget }) {
  console.log(`\n📬 [MAIL NOTIFICATION] New Contact Lead Received:`);
  console.log(`   From: ${name} <${email}>`);
  console.log(`   Project Type: ${projectType || 'General'}`);
  console.log(`   Budget: ${budget || 'Unspecified'}`);
  console.log(`   Message: ${message}`);
  console.log(`   Routed To: ${ENV.CONTACT_RECEIVER_EMAIL}\n`);
  return { delivered: true };
}
