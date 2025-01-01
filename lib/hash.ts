import bcrypt from "bcryptjs";

// Функція для хешування паролю
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Кількість раундів сольової генерації
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Функція для перевірки паролю
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
