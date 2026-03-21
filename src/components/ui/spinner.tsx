import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { spinnerVariants } from "./spinner-variants";

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color, label = "Loading...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(spinnerVariants({ size, color }), className)}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

export interface LoaderProps extends SpinnerProps {
  overlay?: boolean;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ overlay = false, className, ...props }, ref) => {
    if (!overlay) {
      return <Spinner ref={ref} className={className} {...props} />;
    }

    return (
      <div
        className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        aria-live="polite"
      >
        <Spinner ref={ref} className={className} {...props} />
      </div>
    );
  }
);
Loader.displayName = "Loader";

export { Spinner, Loader };
