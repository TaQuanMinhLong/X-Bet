import { forwardRef } from "react";
import { cn } from "~/lib/styles";

export const Spinner = forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<"svg">>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-5 h-5 animate-spin", className)}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
        ref={ref}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 3a9 9 0 1 0 9 9"></path>
      </svg>
    );
  }
);

Spinner.displayName = "Spinner";
