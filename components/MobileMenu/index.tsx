import React from "react";

interface MobileMenuProps {
  visible?: boolean;
  locale?: any;
}

const MobileMenu = ({ visible,locale }: MobileMenuProps) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">{locale==="en"?"Home":"Anasayfa"}</div>
        <div className="px-3 text-center text-white hover:underline">
          {locale==="en"?"Series":"Diziler"}
        </div>
        <div className="px-3 text-center text-white hover:underline">{locale==="en"?"Films":"Filmler"}</div>
        <div className="px-3 text-center text-white hover:underline">
          {locale==="en"?"New & Popular":"Yeni ve Popüler"}
        </div>
        <div className="px-3 text-center text-white hover:underline">
          {locale==="en"?"Browse by languages":"Dillere göre arama"}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
