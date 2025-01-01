import VerifyCodeForm from "@/components/auth/verify-code";

export default function VerifyCodePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerifyCodeForm />
      </div>
    </div>
  );
}
