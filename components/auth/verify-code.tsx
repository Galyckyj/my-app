"use client";

import { useForm } from "react-hook-form";
import { FormOTP } from "./form-inputs";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeValidator } from "@/lib/validators/validScheme";
import { Button } from "../ui/button";
import Link from "next/link";

export default function VerifyCodeForm() {
  const form = useForm({
    resolver: zodResolver(verifyCodeValidator),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: { code: string }) => {
    if (!data.code) return; // Check if data exists
    console.log("Form code:", data.code);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">Підтвердження пошти</h1>
        <p className="text-muted-foreground text-sm">
          Код надіслано на вашу пошту dan**@gmail.com
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <FormOTP form={form} name="code" label="" />
          </div>
          <Button type="submit" className="w-full">
            Відправити
          </Button>
        </form>
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Не отримали код?{" "}
            <Link href="#" className="text-blue-500 underline-offset-2">
              Відправити
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
