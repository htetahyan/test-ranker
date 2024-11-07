import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
const Footer = () => {
  const footerLinks = {
    Product: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/termss' },
      { label: 'Pricing', href: '/pricing' },
    ],
    Learn: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '/help-center' },
    ],
    Contact: [
      { label: 'Email', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-gray-50 py-12 px-8">
       
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 - Featured */}
        <div>
        <Image src={Logo} alt="Logo" width={100} height={100} />

          <span className="text-xs uppercase font-bold text-gray-600">Featured</span>
          <h4 className="font-semibold text-gray-800 mt-2">Generate Test With Ai</h4>
          <p className="text-gray-500 mt-2">
            Create AI-powered questions for job Interview and share them with candidates.
          </p>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Copyright © 2024 Try Skill Test.</p>
          </div>
        </div>

        {/* Map through footerLinks for other columns */}
        {Object.entries(footerLinks).map(([section, links], index) => (
          <div key={index}>
            <h4 className="font-semibold text-gray-800">{section}</h4>
            <ul className="mt-4 space-y-2">
              {links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-500 hover:text-gray-800 transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
