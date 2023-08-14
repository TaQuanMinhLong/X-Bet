import type { ActionFunction, HeadersFunction } from "@remix-run/node";
import { UserButton, useUser } from "@clerk/remix";
import { useFetch, useTheme } from "~/hooks";
import { Button, ThemeBtn } from "~/components/ui";
import { EMPTY_SESSION } from "~/api/session.server";
import { toggleTheme } from "~/lib/styles";
import { Spinner } from "~/components/icons";
import { json } from "@remix-run/node";
import { dark } from "@clerk/themes";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { playerId } = Object.fromEntries(formData);
  if (typeof playerId !== "string") throw json({ error: "Invalid FormData" }, { status: 400 });
  // const res = await fetch({})
  return null;
};

export const headers: HeadersFunction = () => EMPTY_SESSION;

export default function AppIndex() {
  const theme = useTheme();
  const { fetcher, submitting } = useFetch((data) => {});
  const { user } = useUser();

  function handleStartGame() {
    if (user?.id) {
      fetcher.submit({ playerId: user.id }, { method: "POST" });
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh_-_48px)]">
      <div className="flex justify-between text-center">
        <div></div>
        <div className="flex items-center gap-4">
          <ThemeBtn onClick={toggleTheme}>Toggle Theme</ThemeBtn>
          <UserButton
            appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
            afterSignOutUrl="/"
          />
        </div>
      </div>
      <section className="relative flex items-center justify-center flex-grow w-full h-full">
        <Button onClick={handleStartGame}>
          {submitting && <Spinner className="mr-2" />}
          <span>Start Game</span>
        </Button>
      </section>
    </div>
  );
}
