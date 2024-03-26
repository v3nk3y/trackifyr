"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugDroidFill } from "react-icons/pi";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const { status, data } = useSession();
  return (
    <nav className="flex space-x-6 border-b-2 mb-2 px-5 h-14 items-center">
      <Link href="/" className="flex items-center">
        <PiBugDroidFill size={20} />
        <span className="text-xl font-medium">Trakifyr</span>
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "text-gray-900": link.href === currentPath,
                "text-gray-500": link.href !== currentPath,
                "hover:text-gray-800 transition-colors font-medium": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
