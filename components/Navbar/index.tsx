import React, { useCallback, useEffect, useState } from "react";
import NavbarItem from "@/components/NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "@/components/MobileMenu";
import AccountMenu from "@/components/AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import NotificationModal from "@/components/NotificationModal";
import useMovieList from "@/queryHooks/useMovieList";
import { array } from "prop-types";
const TOP_OFFSET = 66;
interface MovieListProps {
  movies: Record<string, any>;
}

const Navbar = ({ movies }: MovieListProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { data: user } = useCurrentUser();

  const escFunction = useCallback((event: any) => {
    if (event.key === "Escape") {
      setShowAccountMenu(false);
      setShowMobileMenu(false);
      setShowNotificationMenu(false);
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

  const handleChange = (event: any) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    const filteredData = movies?.filter((movie: any) => {
      const regex = new RegExp(searchValue, "gi");
      return searchValue.length > 0
        ? movie.title.match(regex) || movie.description.match(regex)
        : null;
    });
    setFilteredData(filteredData);
  };
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
            <div className="search-container">
              <form action="/search" method="get">
                <input
                  className="search expandright"
                  id="searchright"
                  type="search"
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Search"
                />
                <label className="button searchbutton" htmlFor="searchright">
                  <span className="mglass">&#9906;</span>
                </label>
              </form>
            </div>
            {filteredData.length > 0 && (
              <div className="bg-black w-56 absolute top-20 right-16 sm:right-96 py-5 flex-col border-2 border-gray-500 flex">
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
                          Watch now {filter?.title}
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
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
          >
            <BsBell />
            <NotificationModal visible={showNotificationMenu} />
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
