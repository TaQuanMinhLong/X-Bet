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
export default function AppLayout() {
  return (
    <MainLayout className="w-full max-w-screen-xl min-h-screen shadow-md bg-background">
      <Outlet />
    </MainLayout>
  );
}
