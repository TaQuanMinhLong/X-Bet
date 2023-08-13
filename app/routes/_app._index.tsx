import { toggleTheme } from "~/lib/styles";
import { UserButton } from "@clerk/remix";
import { ThemeBtn } from "~/components/ui";
import { useTheme } from "~/hooks";
import { dark } from "@clerk/themes";

export default function Index() {
  const theme = useTheme();

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
      <section className="flex-grow w-full"></section>
    </div>
  );
}
