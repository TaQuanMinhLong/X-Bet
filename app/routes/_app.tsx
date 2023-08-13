import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { Outlet } from "@remix-run/react";
import { MainLayout } from "~/components/layout";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) throw redirect("/sign-in");

  return {};
};
export default function _app() {
  return (
    <MainLayout className="w-full shadow-md max-w-screen-xl bg-background min-h-screen">
      <Outlet />
    </MainLayout>
  );
}
