import * as bcrypt from 'bcrypt';
const saltRounds = 10; // Customize the number of salt rounds as needed

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
