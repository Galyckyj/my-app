import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Hello from resend code route" });
}