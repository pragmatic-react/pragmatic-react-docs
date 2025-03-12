import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

function Button({
  children,
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className="button button--primary text-caption"
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
