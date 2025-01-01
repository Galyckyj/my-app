"use client";

import { useForm } from "react-hook-form";
import { FormInput } from "./form-inputs";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "@/lib/validators/validScheme";
import { Separator } from "../ui/separator";
import LoginWith from "./login-with";
import Link from "next/link";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = async () => {
    // Implement your Google login logic here
    console.log("Google login clicked");
  };

  const handleAppleLogin = async () => {
    // Implement your Apple login logic here
    console.log("Apple login clicked");
  };

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">Вітаю в Dumky</h1>
        <p className="text-muted-foreground text-sm">
          Пройдіть авторизацію для продовження
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            form={form}
            name="email"
            label="Email"
            placeholder="Ваша пошта"
          />
          <FormInput
            form={form}
            name="password"
            label="Пароль"
            type="password"
            placeholder="Ваш пароль"
            showForgotPassword={true}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-md"
          >
            Увійти
          </button>
        </form>
      </Form>

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground">Або</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <LoginWith
          provider="google"
          isLoading={false}
          onLogin={handleGoogleLogin}
        />
        <LoginWith
          provider="apple"
          isLoading={false}
          isDisabled={true} // Вимикаємо кнопку
          onLogin={handleAppleLogin}
        />
      </div>
      <div className="flex justify-center text-center text-sm text-muted-foreground">
        <p>Не маєте акаунту?</p>
        <Link href="/register" className="text-primary underline pl-2">
          Зареєструватися
        </Link>
      </div>
    </div>
  );
}
