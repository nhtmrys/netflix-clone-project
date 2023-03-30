import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Link from "next/link";

interface LanguageSelectProps {
  visible?: boolean;
  locale: any;
}

const LanguageSelect = ({ visible, locale }: LanguageSelectProps) => {
  if (!visible) return null;

  return (
    <div className=" w-24 absolute top-4 right-0 right-0 py-2 flex flex-col border-2 border-transparent rounded-xl flex bg-neutral-700">
      {locale === "en" ? (
        <Link href="/login" locale={"tr"}>
          <div className="p-2">
            <div className="flex flex-row gap-2 items-center">
              <AiFillCheckCircle />
              <div>English</div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <AiFillCheckCircle className="text-transparent" />
              <div>Türkçe</div>
            </div>
          </div>
        </Link>
      ) : (
        <Link href="/login" locale={"en"}>
          <div className="p-2">
            <div className="flex flex-row gap-2 items-center">
              <AiFillCheckCircle className="text-transparent" />
              <div>English</div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <AiFillCheckCircle />
              <div>Türkçe</div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default LanguageSelect;
