import { Suspense, forwardRef } from "react";
import { cn } from "~/lib/styles";
import { IconMoon, IconSun } from "../icons";
import { useTheme } from "~/hooks";

export const ThemeBtn = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  ({ className, type, children, ...props }, ref) => {
    const theme = useTheme();
    return (
      <Suspense fallback={<button>Theme Button</button>}>
        <label
          htmlFor="theme-switcher"
          className={cn(
            "relative inline-block w-12 h-6 shadow-inner rounded-full cursor-pointer",
            theme === "light" ? "bg-gray-300/90 text-gray-500" : "bg-gray-600 text-white"
          )}
        >
          <input
            className={cn("opacity-0 w-0 h-0 peer", className)}
            id="theme-switcher"
            type="checkbox"
            {...props}
            ref={ref}
          />
          <IconMoon className="absolute top-0.5 left-0.5  opacity-0 peer-checked:opacity-100 h-5 w-5 transition-all duration-300" />
          <IconSun className="absolute top-0.5 right-0.5 opacity-100 peer-checked:opacity-0 h-5 w-5 transition-all duration-300" />
          <span
            className={cn(
              "w-5 h-5 top-0.5 left-0.5 peer-checked:translate-x-6 z-10 absolute shadow-md rounded-full transition-all duration-300",
              theme === "light" ? "bg-white" : "bg-gray-800"
            )}
          ></span>
        </label>
      </Suspense>
    );
  }
);

ThemeBtn.displayName = "ThemeBtn";
