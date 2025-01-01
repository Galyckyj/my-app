import { Button } from "@/components/ui/button";
import { Google, Apple } from "iconsax-react";

interface LoginWithProps {
  provider: "google" | "apple";
  isLoading: boolean;
  isDisabled?: boolean; // Додаємо новий пропс
  onLogin: () => Promise<void>;
  className?: string;
}

export const LoginWith: React.FC<LoginWithProps> = ({
  provider,
  isLoading,
  isDisabled = false, // За замовчуванням false
  onLogin,
}) => {
  const buttonText =
    provider === "google" ? "Продовжити з Google" : "Продовжити з Apple";

  return (
    <Button
      variant={"outline"}
      className={"w-full"}
      onClick={onLogin}
      disabled={isLoading || isDisabled} // Комбінуємо обидва стани
    >
      {buttonText}
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin">●</span>
      ) : provider === "google" ? (
        <Google size={20} color="#333" variant="Bold" />
      ) : (
        <Apple size={20} color="#333" variant="Bold" />
      )}
    </Button>
  );
};

export default LoginWith;
