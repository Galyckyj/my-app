"use client";

import { useForm } from "react-hook-form";
import { FormInput } from "./form-inputs";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changepassValidator } from "@/lib/validators/validScheme";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ChangePasswordForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(changepassValidator),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const onSubmit = (data: { password: string; confirm: string }) => {
    console.log("Password:", data.password);
    console.log("Confirm Password:", data.confirm);
    toast({
      description: `✅ Пароль успішно змінено!`,
    });
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">Відновлення паролю</h1>
        <p className="text-muted-foreground text-sm">
          Придумайте новий пароль для вашого акаунту dan**@gmail.com
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            form={form}
            name="password"
            label="Пароль"
            type="password"
            placeholder="Ваш пароль"
          />
          <FormInput
            form={form}
            name="confirm"
            label="Підтвердження пароля"
            type="password"
            placeholder="Підтвердіть ваш пароль"
          />
          <Button type="submit" className="w-full">
            Змінити пароль
          </Button>
        </form>
      </Form>
    </div>
  );
}
