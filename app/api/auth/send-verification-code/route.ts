import { NextResponse } from "next/server";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Некоректний email"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = emailSchema.parse(body);

    // Генерація 6-значного коду
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Логіка надсилання email (замініть console.log на інтеграцію з email-сервісом)
    console.log(`Код підтвердження для ${email}: ${verificationCode}`);

    return NextResponse.json({ message: "Код відправлено на вашу пошту" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Некоректний email", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Помилка сервера:", error);
    return NextResponse.json(
      { message: "Помилка на сервері" },
      { status: 500 }
    );
  }
}
