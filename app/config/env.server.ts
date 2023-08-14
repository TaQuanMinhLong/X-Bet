import type { Theme } from "~/schema";
import { z } from "zod";

const $env = z.object({
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  SESSION_SECRET: z.string(),
  BASE_URL: z.string(),
  API_URL: z.string(),
  WS_URL: z.string(),
});

$env.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof $env> {}
  }
  interface Window {
    ENV: {
      NODE_ENV: "development" | "production" | "test";
      BASE_URL: string;
      WS_URL: string;
    };
  }
  interface ThemeChangeEventPayload {
    theme: Theme;
  }

  interface ThemeChangeEvent extends Event {
    detail: ThemeChangeEventPayload;
  }
}
