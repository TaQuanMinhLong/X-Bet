import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { DEFAULT_THEME, isValidTheme, type Theme } from "./schema";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { ClerkApp, V2_ClerkErrorBoundary } from "@clerk/remix";
import { parseCookie } from "./api/utils.server";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader(args: LoaderArgs) {
  return rootAuthLoader(args, async ({ request }) => {
    const cookie = parseCookie(request.headers.get("Cookie") || "");
    const theme = cookie.get("theme") as Theme;
    if (!isValidTheme(theme)) cookie.set("theme", DEFAULT_THEME);
    const { BASE_URL, NODE_ENV } = process.env;
    return json(
      { theme, ENV: { BASE_URL, NODE_ENV } },
      { headers: { "Set-Cookie": `theme=${cookie.get("theme")}` } }
    );
  });
}
export const ErrorBoundary = V2_ClerkErrorBoundary();

function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Bet-X | Guess who won?</title>
        <meta name="description" content="Rock Scissors - Paper | Guess who won?" />
        <meta name="keywords" content="kéo búa bao; oẳn tù tì; rock scissors paper; bet" />
        <Meta />
        <Links />
      </head>
      <body className={data.theme}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script
          dangerouslySetInnerHTML={{ __html: `window.ENV = ${JSON.stringify(data.ENV)}` }}
        ></script>
      </body>
    </html>
  );
}

export default ClerkApp(App);
