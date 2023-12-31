import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/Profile";

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

export default async function HomePage() {
  // Grab session from Next auth
  const session = await auth();
  return (
    <main>
      <AuthButton action={actions.signIn} buttonText="Sign In" />
      <AuthButton action={actions.signOut} buttonText="Sign Out" />

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>You are signed out</div>
      )}
      <Profile />
    </main>
  );
}
