import { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: ReactNode;
}

export function Card({
  hoverable = false,
  children,
  className = "",
  ...props
}: CardProps): ReactNode {
  return (
    <div
      className={[
        styles.card,
        hoverable ? styles.hoverable : "",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({
  children,
  className = "",
  ...props
}: CardHeaderProps): ReactNode {
  return (
    <div className={[styles.header, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardBody({
  children,
  className = "",
  ...props
}: CardBodyProps): ReactNode {
  return (
    <div className={[styles.body, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({
  children,
  className = "",
  ...props
}: CardFooterProps): ReactNode {
  return (
    <div className={[styles.footer, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
