import { MainLayout } from "~/components/layout";
import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <MainLayout>
      <SignIn routing="path" path={"/sign-in"} />
    </MainLayout>
  );
}
