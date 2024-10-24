'use client';
import { SelectUsers } from "@/db/schema/schema";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar
} from "@nextui-org/react";

export default function Header({ user }: { user: SelectUsers }) {
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            My assessments
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Candidates
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
     
  <Link href="/dashboard/my-settings">  
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user.name}
              fallback={user.name?.charAt(0)}
              size="sm"
             // You can replace this with user profile image URL if available
            /></Link>
       
      </NavbarContent>
    </Navbar>
  );
}
