import { NextResponse } from "next/server";

// Симуляція бази даних
const tempUserState: { email: string; isVerified: boolean } | null = null;

export async function GET() {
  if (!tempUserState || tempUserState.isVerified) {
    return NextResponse.json({ isVerificationStage: false, email: null });
  }

  return NextResponse.json({
    isVerificationStage: true,
    email: tempUserState.email,
  });
}
