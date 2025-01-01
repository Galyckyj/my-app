"use client";

import { useForm } from "react-hook-form";
import { FormInput, FormCheckbox } from "./form-inputs";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidator } from "@/lib/validators/validScheme";
import { Separator } from "../ui/separator";
import LoginWith from "./login-with";
import Link from "next/link";
import { Button } from "../ui/button";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreementAccepted: false,
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

  const onSubmit = (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreementAccepted: boolean;
  }) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">Вітаю в Dumky</h1>
        <p className="text-muted-foreground text-sm">
          Пройдіть реєстрацію для продовження
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            form={form}
            name="name"
            label="Ім'я"
            placeholder="Псевдонім"
          />
          <FormInput
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Ваша електронна пошта"
          />
          <FormInput
            form={form}
            name="password"
            label="Пароль"
            type="password"
            placeholder="Ваш пароль"
          />
          <FormInput
            form={form}
            name="confirmPassword"
            label="Підтвердження пароля"
            type="password"
            placeholder="Підтвердіть ваш пароль"
          />
          <FormCheckbox
            form={form}
            name="agreementAccepted"
            label="Я приймаю умови користування"
          />
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-md"
          >
            Зареєструватися
          </Button>
        </form>
      </Form>
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground">Або</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex justify-center flex-col md:flex-row gap-4 ">
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
        <p>Маєте акаунт?</p>
        <Link href="/login" className="text-primary underline pl-2">
          Увійти
        </Link>
      </div>
    </div>
  );
}
