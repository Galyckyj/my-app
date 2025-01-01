import { z } from "zod";

// Registration validation schema
export const registerValidator = z
  .object({
    name: z.string().min(2, "Ім'я повинно містити принаймні 2 символи"),
    email: z.string().email("Неправильний формат електронної пошти"),
    password: z
      .string()
      .min(8, "Пароль повинен містити принаймні 8 символів")
      .max(100, "Пароль занадто довгий")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль повинен містити принаймні одну велику літеру, одну малу літеру та одну цифру"
      ),
    confirmPassword: z.string().min(1, "Пароль обов'язковий"),
    agreementAccepted: z.boolean().refine((val) => val === true, {
      message: "Ви повинні прийняти умови користування",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

// Change password validation schema
export const changepassValidator = z
  .object({
    password: z
      .string()
      .min(8, "Пароль повинен містити принаймні 8 символів")
      .max(100, "Пароль занадто довгий")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль повинен містити принаймні одну велику літеру, одну малу літеру та одну цифру"
      ),
    confirm: z.string().min(1, "Пароль обов'язковий"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Паролі не співпадають",
    path: ["confirm"], // path of error
  });

// Login validation schema
export const loginValidator = z.object({
  email: z.string().email("Неправильний формат електронної пошти"),
  password: z.string().min(1, "Пароль обов'язковий"),
});

// Verification code validation schema
export const verifyCodeValidator = z.object({
  code: z.string().length(6, "Код має містити 6 символів"),
});

// Type aliases for validation results
export type ChangepassRequest = z.infer<typeof changepassValidator>;
export type VerifyCodeRequest = z.infer<typeof verifyCodeValidator>;
export type RegisterRequest = z.infer<typeof registerValidator>;
export type LoginRequest = z.infer<typeof loginValidator>;
