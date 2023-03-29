import React from "react";
import Link from "next/link";

interface NavbarItemProps {
  label: string;
  hrefUrl: string;
  locale: any;
}

const NavbarItem = ({ label, hrefUrl, locale }: NavbarItemProps) => {
  console.log("locale", locale, label);
  return (
    <Link
      href={hrefUrl}
      locale={locale}
      className="text-white cursor-pointer hover:text-gray-300 transition"
    >
      {label}
    </Link>
  );
};

export default NavbarItem;
