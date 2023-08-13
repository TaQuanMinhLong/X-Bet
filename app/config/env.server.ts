import type { Theme } from "~/schema";
import { z } from "zod";

const $env = z.object({
  BASE_URL: z.string(),
  CLERK_SECRET_KEY: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string(),
});

$env.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof $env> {}
  }
  interface Window {
    ENV: {
      BASE_URL: string;
      NODE_ENV: "development" | "production" | "test";
    };
  }
  interface ThemeChangeEventPayload {
    theme: Theme;
  }

  interface ThemeChangeEvent extends Event {
    detail: ThemeChangeEventPayload;
  }
}
