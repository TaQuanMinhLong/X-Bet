import { useCallback, useEffect, useState } from "react";
import { THEME_CHANGE_EVENT, type Theme } from "~/schema";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>();

  const handleThemeChange = useCallback((e: ThemeChangeEvent) => setTheme(e.detail.theme), []);

  useEffect(() => {
    setTheme(document.body.classList.contains("dark") ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.body.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as any);
    return () => document.body.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange as any);
  }, [handleThemeChange]);

  return theme;
}

export function changeTheme(theme: Theme) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(THEME_CHANGE_EVENT, {
      detail: { theme },
    });
    document.body.dispatchEvent(event);
  }
}
