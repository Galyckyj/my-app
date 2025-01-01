// actions/auth.ts

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Функція для авторизації користувача
export async function loginUser(data: LoginData): Promise<void> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Помилка авторизації");
  }
}

// Функція для реєстрації користувача
export async function registerUser(data: RegisterData): Promise<void> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Помилка реєстрації");
  }
}

// Функція для повторного відправлення коду підтвердження
export async function resendVerificationCode(email: string): Promise<void> {
  const response = await fetch("/api/auth/resend-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Не вдалося відправити код підтвердження");
  }
}
