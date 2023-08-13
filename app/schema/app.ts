import { z } from "zod";

export const themeSchema = z.enum(["light", "dark"]);
export const isValidTheme = (theme: unknown) => themeSchema.safeParse(theme).success;
export const DEFAULT_THEME: Theme = "dark";
export const THEME_CHANGE_EVENT = "theme-changed";
export type Theme = z.infer<typeof themeSchema>;
