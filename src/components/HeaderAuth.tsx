"use client";
import { useSession } from "next-auth/react";
import {
  NavbarItem,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@nextui-org/react";
import { auth } from "@/auth";
import * as actions from "@/actions";

const HeaderAuth = () => {
  const session = useSession();

  // Handle session loading to prevent showing sign in/up buttons
  if (session?.status === "loading") return "authenticating...";

  return session?.data?.user ? (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar
          isBordered
          src={session?.data?.user.image || ""}
          className="cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <form action={actions.signOut}>
            <Button type="submit" className="bg-white">
              Sign Out
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="secondary" variant="bordered">
            Sign In
          </Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="primary" variant="flat">
            Sign Up
          </Button>
        </form>
      </NavbarItem>
    </>
  );
};

export default HeaderAuth;
