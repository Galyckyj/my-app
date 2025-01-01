import { NextResponse } from "next/server";
import { z } from "zod";

const verifySchema = z.object({
  email: z.string().email("Некоректний email"),
  code: z.string().length(6, "Код має складатися з 6 цифр"),
});

// Симуляція бази даних
const tempUserState: { email: string; isVerified: boolean } | null = null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, code } = verifySchema.parse(body);

    // Перевірка коду (отримайте код та час закінчення з бази даних)
    const storedCode = "123456"; // Замініть на код з бази
    const expirationTime = Date.now() + 10 * 60 * 1000; // Замініть на час закінчення з бази

    // Перевірка коду (для демонстрації код завжди 123456)
    if (tempUserState?.email === email && code === "123456") {
      tempUserState.isVerified = true;
      return NextResponse.json({ message: "Пошта підтверджена!" });
    }

    if (Date.now() > expirationTime) {
      return NextResponse.json({ message: "Код закінчився" }, { status: 400 });
    }

    if (code !== storedCode) {
      return NextResponse.json({ message: "Невірний код" }, { status: 400 });
    }

    // Маркуємо email як підтверджений (оновлення в базі даних)
    console.log(`Email ${email} підтверджено`);

    return NextResponse.json({ message: "Пошта успішно підтверджена" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Некоректні дані", errors: error.errors },
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
