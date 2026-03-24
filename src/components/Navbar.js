import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1e293b] text-white px-4 sm:px-8 md:px-16 py-4 shadow-md z-40 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
            <Image
                src="/logo.png"
                alt="gluco-logo"
                height={60}
                width={60}
                priority
            />
            <span className="text-3xl font-semibold tracking-wide">
                GlucoSense
             </span>
        </Link>
    </nav>
  )
}

export default Navbar
