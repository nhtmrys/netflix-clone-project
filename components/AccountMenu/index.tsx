import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BsPencil } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";

interface AccountMenuProps {
  visible?: boolean;
  locale: any;
}
const AccountMenu = ({ visible, locale }: AccountMenuProps) => {
  const { data: user } = useCurrentUser();
  if (!visible) return null;
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-500 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src={user?.image} alt="" />
          <p className="text-white text-lg group-hover/item:underline">
            {user?.name}
          </p>
        </div>
        <Link
          href="/profiles"
          className="px-3 group/item flex flex-row gap-3 items-center w-full"
        >
          <BsPencil className="text-white w-8" />
          <p className="text-white text-md group-hover/item:underline ">
            {locale === "en" ? "Profile" : "Profil"}
          </p>
        </Link>
        <Link
          href="/account"
          className="px-3 group/item flex flex-row gap-3 items-center w-full"
        >
          <MdOutlineAccountCircle className="text-white w-8" />
          <p className="text-white text-md group-hover/item:underline">
            {locale === "en" ? "Account" : "Hesap"}
          </p>
        </Link>
        <Link
          href="/help"
          className="px-3 group/item flex flex-row gap-3 items-center w-full"
        >
          <BiHelpCircle className="text-white w-8" />
          <p className="text-white text-md group-hover/item:underline">
            {locale === "en" ? "Help Center" : "Yardım Merkezi"}
          </p>
        </Link>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white hover:underline"
        >
          {locale === "en" ? "Sign out from Netflix" : "Netflix'ten çıkış yap"}
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
