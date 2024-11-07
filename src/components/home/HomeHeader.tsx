'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import Image from "next/image";
import { FaChevronDown, FaLock, FaChartLine, FaBolt, FaHome } from 'react-icons/fa'; // React icons
import { GoLaw } from "react-icons/go";
import Logo from '@/assets/logo.png';
import { usePathname } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";

export default function HomeHeader() {
  const pathname = usePathname();
  const features = [
    { key: 'privacy_policy', description: 'Privacy Policy', icon: <FaLock className="text-blue-400" size={16} /> },
    { key: 'terms_conditions', description: 'Terms & Conditions', icon: <GoLaw className="text-teal-400" size={16} /> },
    { key: 'blogs', description: 'Blogs', icon: <FaChartLine size={16} className="text-red-400" /> },
    { key: 'faqs', description: 'FAQs', icon: <FaBolt size={16} className="text-yellow-400" /> },
  ];

  const renderLink = (href: string, text: string, startIcon: React.ReactNode) => (
    <Link href={href}>
      <Button
        disableAnimation
        startContent={startIcon}
        className={`text-md ${pathname === href ? 'text-blue-500' : 'text-black'}`}
        variant="light"
      >
        {text}
      </Button>
    </Link>
  );

  return (
    <Navbar>
      <NavbarBrand className="bg-opacity-0">
        <Image className="h-28 w-32" src={Logo} alt="Logo" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          {renderLink('/', 'Home', <FaHome />)}
        </NavbarItem>
        <NavbarItem>
          {renderLink('/pricing', 'Pricing', <FaChartLine />)}
        </NavbarItem>
        <NavbarItem>
          {renderLink('/about', 'About', <FaBolt />)}
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<FaChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="App features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {features.map(feature => (
              <DropdownItem
                key={feature.key}
                description={feature.description}
                startContent={feature.icon}
              >
                {feature.key.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button endIcon={<MdAccountCircle />} as={Link} className="text-white bg-black" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
