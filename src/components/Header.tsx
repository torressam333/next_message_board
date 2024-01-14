import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent
} from "@nextui-org/react";
import HeaderAuth from "./HeaderAuth";
import SearchInput from "./SearchInput";

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
          <SearchInput />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
