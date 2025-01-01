import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { registerValidator } from "@/lib/validators/validScheme";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    // Отримання даних із запиту
    const body = await req.json();
    const data = registerValidator.parse(body); // Перевіряємо дані

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Користувач з такою електронною поштою вже існує" },
        { status: 400 }
      );
    }

    // Хешуємо пароль
    const hashedPassword = await hashPassword(data.password);

    // Збереження юзера в базі даних
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        username: data.email, // Тут замість пошти має бути унікальний юзернейм
      },
    });

    // // Send verification code
    // await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-verification-code`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email: data.email }),
    //   }
    // );

    // Емуляція реєстрації користувача (без бази даних)
    console.log("Новий користувач зареєстрований:", data);

    // Відправка відповіді
    return NextResponse.json(
      { message: "Користувач успішно зареєстрований", user: data },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Якщо дані некоректні
      return NextResponse.json(
        { message: "Помилка валідації", errors: error.errors },
        { status: 400 }
      );
    }

    // Інші помилки
    console.error("Помилка на сервері:", error);
    return NextResponse.json(
      { message: "Сталася помилка на сервері" },
      { status: 500 }
    );
  }
}
