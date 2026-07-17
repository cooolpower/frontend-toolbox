import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps): ReactNode {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      className={buttonStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      {!isLoading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
}
