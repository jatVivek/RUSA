import bcrypt from 'bcryptjs';

export async function hashPassword(plainText) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function comparePassword(plainText, hash) {
  return bcrypt.compare(plainText, hash);
}
