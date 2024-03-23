import * as React from "react";
import { cn } from "@/lib/utils";
import { CardHeader } from "./CardHeader";
import { CardFooter } from "./CardFooter";
import { CardTitle } from "./CardTitle";
import { CardDescription } from "./CardDescription";
import { CardContent } from "./CardContent";

type Card = React.HTMLAttributes<HTMLDivElement> & {};

type CardComponent = React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement>
> & {
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
  Title: typeof CardFooter;
  Description: typeof CardDescription;
  Content: typeof CardContent;
};

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow max-w-[350px]",
      className
    )}
    {...props}
  />
)) as CardComponent;
Card.displayName = "Card";
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
