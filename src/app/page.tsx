import { Button } from "@nextui-org/react";
import * as actions from "@/actions";

type AuthButtonProps = {
  action: () => Promise<void>;
  buttonText: string;
};

const AuthButton = ({ action, buttonText }: AuthButtonProps) => {
  return (
    <form action={action}>
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

export default function HomePage() {
  return (
    <main>
      <AuthButton action={actions.signIn} buttonText="Sign In" />
      <AuthButton action={actions.signOut} buttonText="Sign Out" />
    </main>
  );
}
