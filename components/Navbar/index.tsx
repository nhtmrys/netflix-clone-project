import { useCallback, useEffect, useState } from "react";
import NavbarItem from "@/components/NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "@/components/MobileMenu";
import AccountMenu from "@/components/AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
const TOP_OFFSET = 66;
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { data: user } = useCurrentUser();
  const escFunction = useCallback((event: any) => {
    if (event.key === "Escape") {
      setShowAccountMenu(false);
      setShowMobileMenu(false);
    }
  }, []);

  const handleOutsideClick = useCallback((event: any) => {
    if (event.target.id === "account-menu") {
      setShowAccountMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Link href="/">
          <img className="h-4 lg:h-7" src="/images/logo.png" alt="" />
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem hrefUrl={"/"} label={"Home"} />
          <NavbarItem hrefUrl={"/"} label={"Series"} />
          <NavbarItem hrefUrl={"/"} label={"Films"} />
          <NavbarItem hrefUrl={"/"} label={"New & Popular"} />
          <NavbarItem hrefUrl={"#my-list"} label={"My List"} />
          <NavbarItem hrefUrl={"/"} label={"Browse by languages"} />
        </div>
        <div
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`
        text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src={user?.image} alt="" />
            </div>

            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
