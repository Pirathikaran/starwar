import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant: "primary" | "tertiary" | "ghost" | "success" | "warning" | "danger" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
}>;

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "sm",
  icon,
  iconPosition = "left",
  disabled = false,
}: ButtonProps) => {
  // Variant styles
  const variantClasses = {
    primary:
      "bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-600",
    tertiary:
      "bg-white text-black border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200",
    ghost:
      "text-[#1A73E8] hover:text-[#419FFF] hover:bg-[rgba(65,159,255,0.1)] focus:ring-0 transition-all",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    warning:
      "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
  };

  // Size styles
  const sizeClasses = {
    sm: "text-sm py-2 px-2",
    md: "text-base py-4 px-10",
    lg: "text-lg py-4 px-12",
  };

  // Disabled styles
  const disabledClasses =
    "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300";

  // Layout styles
  const layoutClasses = "w-[176px] h-[56px] rounded-[8px]";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-3 
        transition-all duration-200
        ${layoutClasses} 
        ${disabled ? disabledClasses : variantClasses[variant]} 
        ${sizeClasses[size]}
      `}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};
