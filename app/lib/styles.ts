import type { ClassValue } from "clsx";
import { changeTheme } from "~/hooks";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleTheme() {
  if (typeof window !== "undefined") {
    document.body.classList.toggle("dark");
    const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
    document.cookie = `theme=${newTheme}`;
    changeTheme(newTheme);
  }
}
