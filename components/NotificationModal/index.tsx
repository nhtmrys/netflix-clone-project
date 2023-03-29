import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BsPencil } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import useMovieList from "@/queryHooks/useMovieList";

interface NotificationModalProps {
  visible?: boolean;
  locale?: string;
}
const NotificationModal = ({ visible, locale }: NotificationModalProps) => {
  /*  const { data: user } = useCurrentUser();*/

  const { data: movies = [] } = useMovieList();
  if (!visible) return null;
  return (
    <div className="bg-black w-56 absolute top-20 right-16 sm:right-36 py-5 flex-col border-2 border-gray-500 flex">
      <div className="flex flex-col gap-3">
        {movies &&
          movies.length > 0 &&
          movies.slice(4, -1).map((movie: any, index: string) => (
            <a key={index} href={`/watch/${movie.id}`}>
              <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                <img
                  className="w-8 rounded-md"
                  src={movie?.thumbnailUrl}
                  alt=""
                />
                <p className="text-white text-sm group-hover/item:underline">
                  {locale === "en"
                    ? "Watch now " + movie?.title
                    : movie?.title + " izle"}
                </p>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default NotificationModal;
