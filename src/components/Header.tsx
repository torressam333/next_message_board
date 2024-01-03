import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Input,
  NavbarContent
} from "@nextui-org/react";
import HeaderAuth from "./HeaderAuth";

const Header = async () => {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Geek Out Inc
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
