import { forwardRef } from "react";
import { cn } from "~/lib/styles";

interface MainLayoutProps extends React.ComponentPropsWithoutRef<"section"> {
  wrapperClassname?: string;
  bgImgSrc?: string;
}

export const MainLayout = forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ className, children, wrapperClassname, bgImgSrc = "/img/background.png", ...props }, ref) => {
    return (
      <>
        <main
          className={cn(
            "h-screen w-screen flex items-center justify-center relative",
            wrapperClassname
          )}
        >
          <div className={cn("relative p-6", className)} {...props} ref={ref}>
            {children}
          </div>
          <img
            className="absolute select-none -z-50 inset-0 w-full h-full object-cover"
            alt="background"
            src={bgImgSrc}
            loading="lazy"
          />
        </main>
      </>
    );
  }
);

MainLayout.displayName = "MainLayout";
