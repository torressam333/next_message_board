import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Input,
  Avatar,
  NavbarContent
} from "@nextui-org/react";
import { auth } from "@/auth";
import AuthButton from "./AuthButton";
import * as actions from "@/actions";

const Header = async () => {
  // Grab session
  const session = await auth();

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          GEEK OUT
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session?.user ? (
            <Avatar src={session.user.image?.toString()} />
          ) : (
            <AuthButton action={actions.signIn} buttonText="Sign In" />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
