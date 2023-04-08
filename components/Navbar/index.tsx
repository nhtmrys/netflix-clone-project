import React, { useCallback, useEffect, useRef, useState } from "react";
import NavbarItem from "@/components/NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "@/components/MobileMenu";
import AccountMenu from "@/components/AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import NotificationModal from "@/components/NotificationModal";

const TOP_OFFSET = 66;

interface MovieListProps {
  movies: Record<string, any>;
  locale: any;
  sticky?: boolean;
}

const Navbar = ({ movies, locale,sticky }: MovieListProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };
  const [filteredData, setFilteredData] = useState([]);

  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowNotificationMenu(false);
      setShowAccountMenu(false);
      setShowMobileMenu(false);
    }
  };

  const { data: user } = useCurrentUser();

  const escFunction = useCallback((event: any) => {
    if (event.key === "Escape") {
      setShowAccountMenu(false);
      setShowMobileMenu(false);
      setShowNotificationMenu(false);
      setFilteredData([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("mousedown", handleClickOutside);
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

  const handleChange = (event: any) => {
    const searchValue = event.target.value;
    const filteredData = movies?.filter((movie: any) => {
      const regex = new RegExp(searchValue, "gi");
      return searchValue.length > 0
        ? movie.title.match(regex) || movie.description.match(regex)
        : null;
    });
    
    setFilteredData(filteredData);
  };

  return (
    <nav className={`w-full z-40 ${sticky?"fixed":"absolute top-0"}`}>
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Link href="/">
          <img className="h-4 lg:h-7" src="/images/logo.png" alt="" />
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem
            hrefUrl={locale === "tr" ? "/tr" : "/"}
            label={locale === "tr" ? "Anasayfa" : "Home"}
            locale={locale}
          />
          <NavbarItem
            hrefUrl={"/"}
            label={locale === "tr" ? "Diziler" : "Series"}
            locale={locale}
          />
          <NavbarItem
            hrefUrl={"/"}
            label={locale === "tr" ? "Filmler" : "Films"}
            locale={locale}
          />
          <NavbarItem
            hrefUrl={"/"}
            label={locale === "tr" ? "Yeni ve Popüler" : "New & Popular"}
            locale={locale}
          />
          <NavbarItem
            hrefUrl={"#my-list"}
            label={locale === "tr" ? "Listem" : "My List"}
            locale={locale}
          />
          <NavbarItem
            hrefUrl={"/"}
            label={
              locale === "tr" ? "Dillere göre arama" : "Browse by languages"
            }
            locale={locale}
          />
        </div>
        <div
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">{locale==="en"?"Browse":"Gözat"}</p>
          <BsChevronDown
            className={`
        text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`}
          />
          <MobileMenu locale={locale} visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <div className="relative flex  items-center">
              <span
                className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none  ${
                  isExpanded ? "hidden" : ""
                }`}
              >
                <BsSearch className="cursor-pointer " />
              </span>
              <input
                type="text"
                className={`${
                  isExpanded
                    ? " w-36 sm:w-64 transition-all duration-300 bg-gray-100 border-2 rounded-full"
                    : "w-0 bg-transparent border-transparent outline-none"
                } h-10 py-2 pl-10 cursor-pointer text-sm text-gray-900 placeholder-gray-500 rounded-full shadow-sm  transition-all duration-300 focus:ring-0 placeholder:text-[10px]`}
                placeholder={
                  locale === "tr"
                    ? "Dizi veya film ara"
                    : "Search for a movie or a series"
                }
                onFocus={handleExpand}
                onBlur={handleCollapse}
                onChange={handleChange}
                autoComplete={"off"}
              />
            </div>
            {filteredData.length > 0 && (
              <div className=" absolute top-14 w-64 py-2 bg-neutral-900 border border-gray-300 rounded-md shadow-lg">
                <div className="flex flex-col gap-3">
                  {filteredData.map((filter: any, index) => (
                    <a key={index} href={`/watch/${filter.id}`}>
                      <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                        <img
                          className="w-8 rounded-md"
                          src={filter?.thumbnailUrl}
                          alt=""
                        />
                        <p className="text-white text-sm group-hover/item:underline">
                          {locale === "en"
                            ? "Watch now " + filter?.title
                            : filter?.title + " izle"}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            ref={ref}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
          >
            <BsBell />
            <NotificationModal visible={showNotificationMenu} locale={locale} />
          </div>
          <div
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            ref={ref}
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
            <AccountMenu locale={locale} visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
