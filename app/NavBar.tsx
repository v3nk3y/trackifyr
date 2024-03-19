"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugDroidFill } from "react-icons/pi";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b-2 mb-2 px-5 h-14 items-center">
      <Link href="/" className="flex items-center">
        <PiBugDroidFill size={20} />
        <span className="text-xl font-medium">Trakifyr</span>
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              link.href === currentPath ? "text-gray-900" : "text-gray-500"
            }  hover:text-gray-800 transition-colors font-medium`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
