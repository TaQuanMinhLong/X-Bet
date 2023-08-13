import { MainLayout } from "~/components/layout";
import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
  return (
    <MainLayout>
      <SignUp routing={"path"} path={"/sign-up"} />
    </MainLayout>
  );
}
