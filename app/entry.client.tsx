import { startTransition, StrictMode } from "react";
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import { cacheAssets } from "remix-utils";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
  cacheAssets().catch((error) => {
    console.error(error);
  });
});
