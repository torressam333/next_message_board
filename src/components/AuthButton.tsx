import { Button } from "@nextui-org/react";

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

export default AuthButton;
