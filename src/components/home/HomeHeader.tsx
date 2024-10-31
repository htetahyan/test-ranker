'use client'
import { Button, Dropdown, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa'

const HomeHeader = () => {
  return (
   <Navbar>
    <NavbarBrand>
        <p>logo</p>
    </NavbarBrand>
    <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
            <Link href='/'>Home</Link>
        </NavbarItem>
        <NavbarItem>
            <Link href='/pricing'>Pricing</Link>
            </NavbarItem>
        <NavbarItem>
            <Link href='/about'>About</Link>
            </NavbarItem>

        </NavbarContent>
        <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
   </Navbar>
  )
}

export default HomeHeader
