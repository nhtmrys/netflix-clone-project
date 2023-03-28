import React from "react";

interface NavbarItemProps {
  label: string;
  hrefUrl: string;
}

const NavbarItem = ({ label, hrefUrl }: NavbarItemProps) => {
  return (
    <a
      href={hrefUrl}
      className="text-white cursor-pointer hover:text-gray-300 transition"
    >
      {label}
    </a>
  );
};

export default NavbarItem;
