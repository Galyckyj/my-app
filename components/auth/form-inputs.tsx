"use client";

import { UseFormReturn, Path, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

// Базовий інтерфейс для значень форми
// interface FormValues extends FieldValues {
//   name?: string;
//   email?: string;
//   password?: string;
//   confirm?: string;
//   checkbox?: boolean;
// }

// Інтерфейс для пропсів з дженериком
interface FormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  showForgotPassword?: boolean;
}

// Компонент з типізацією для текстових полів
export function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  type = "text",
  placeholder,
  showForgotPassword,
}: FormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel>{label}</FormLabel>
            {showForgotPassword && (
              <Link
                href="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Забули пароль?
              </Link>
            )}
          </div>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Інтерфейс для чекбоксу
interface FormCheckboxProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

// Компонент для чекбоксу
export function FormCheckbox<T extends FieldValues>({
  form,
  name,
  label,
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(value) => field.onChange(Boolean(value))}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

// Інтерфейс для OTP-поля
interface FormOTPProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

// Компонент для OTP-поля
export function FormOTP<T extends FieldValues>({
  form,
  name,
  label,
}: FormOTPProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputOTP
              maxLength={6}
              value={field.value || ""}
              onChange={(value) => field.onChange(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
