'use client';
import React, { ReactNode, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import Image from "next/image";
import { FaChevronDown, FaLock, FaChartLine, FaBolt, FaHome } from 'react-icons/fa'; // React icons
import { GoLaw } from "react-icons/go";
import Logo from '@/assets/logo.png';
import { usePathname, useRouter } from "next/navigation";
import { MdDashboard, MdStart, MdSubscriptions } from "react-icons/md";
import Link from 'next/link';
import { IoPricetagsOutline } from "react-icons/io5";

interface Feature {
  key: string;
  description: string;
  icon: ReactNode;
  path: string;
}

interface MenuItem {
  href: string;
  text: string;
  icon: ReactNode;
}

export default function HomeHeader({ user }: { user: any }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features: Feature[] = [
    { key: 'privacy_policy', description: 'Privacy Policy', icon: <FaLock className="text-blue-400" size={16} />, path: '/privacy' },
    { key: 'terms_conditions', description: 'Terms & Conditions', icon: <GoLaw className="text-teal-400" size={16} />, path: '/terms' },
    { key: 'blogs', description: 'Blogs', icon: <FaChartLine size={16} className="text-red-400" />, path: '/blogs' },
    { key: 'faqs', description: 'FAQs', icon: <FaBolt size={16} className="text-yellow-400" />, path: '/faqs' },
  ];

  const menuItems: MenuItem[] = [
    { href: '/', text: 'Home', icon: <FaHome /> },
    { href: '/pricing', text: 'Pricing', icon: <IoPricetagsOutline />
    },
  ];
  const router=useRouter()
 
  const pushToPath=(path:string)=>{
    router.push(path)
   
  }

  const renderLink = (href: string, text: string, startIcon: ReactNode) => (
    <Link href={href} key={href}>
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
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} className='fixed -top-2'>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="bg-opacity-0">
          <Image className="h-16 w-20" src={Logo} alt="Logo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            {renderLink(item.href, item.text, item.icon)}
          </NavbarItem>
        ))}
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
                onClick={()=>pushToPath(feature.path)}
              >
                
                  {feature.key.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
             
              </DropdownItem>
          
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        {user ? (
          <Button endContent={<MdDashboard size={16}/>} as={Link} className="text-white bg-black/70" href="/dashboard" variant="flat">
            Account
          </Button>
        ):  <Button endContent={<MdStart size={16}/>} as={Link} className="text-white bg-black/70" href="/account" variant="flat">
        Get Started
      </Button>}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu >
        {menuItems.concat(features as any).map((item:any, index) => (
          <NavbarMenuItem key={`${item.href || item.key}-${index}`} >
            <Link 
          onClick={()=>setIsMenuOpen(false)}
              href={item.path || item.href}
            >
              {item.text || item.key.split('_').map((word:any) => word[0].toUpperCase() + word.slice(1)).join(' ')}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
