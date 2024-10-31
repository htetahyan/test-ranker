'use client';
import { SelectUsers } from "@/db/schema/schema";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,

  Avatar
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ user }: { user: SelectUsers }) {
const pathname=usePathname()
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem isActive={pathname==="/dashboard"}>
          <Link color={pathname==="/dashboard" ? "primary" : "foreground"} href="/dashboard"  >
Dashboard          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname==="/dashboard/assessments"}>
          <Link color={pathname==="/dashboard/assessments" ? "primary" : "foreground"} href="/dashboard/assessments"  >
            My assessments
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname==="/dashboard/candidates"}>
          <Link color={pathname==="/dashboard/candidates" ? "primary" : "foreground"} href="/dashboard/candidates">
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
