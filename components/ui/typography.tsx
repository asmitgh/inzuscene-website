import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const headingVariants = cva(
  "font-sans tracking-tight text-foreground",
  {
    variants: {
      size: {
        xxs: "text-xs font-semibold",
        xs: "text-sm font-semibold",
        sm: "text-base font-semibold",
        md: "text-lg font-semibold",
        lg: "text-xl font-semibold",
        xl: "text-2xl font-bold",
        "2xl": "text-3xl font-bold",
        "3xl": "text-4xl font-bold",
        "4xl": "text-5xl font-bold",
        "5xl": "text-6xl font-bold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const paragraphVariants = cva(
  "text-foreground leading-normal",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
    },
    defaultVariants: {
      size: "md",
      weight: "normal",
    },
  }
);

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Heading({
  className,
  children,
  as: Component = "h2",
  size,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ size, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export function Paragraph({
  className,
  children,
  size,
  weight,
  ...props
}: ParagraphProps) {
  return (
    <p
      className={cn(paragraphVariants({ size, weight, className }))}
      {...props}
    >
      {children}
    </p>
  );
}