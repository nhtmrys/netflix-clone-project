import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = ({ locale }: any) => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="px-4 py-6 transition duration-500">
        <div className="md:flex md:justify-between">
          <div className="mb-6 sm:px-16">
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a
                href="#"
                className="text-gray-100 hover:text-gray-900 dark:hover:text-white"
              >
                <FaFacebookF />
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-gray-900 dark:hover:text-white"
              >
                <FaInstagram />
                <span className="sr-only">Instagram page</span>
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-gray-900 dark:hover:text-white"
              >
                <FaTwitter />
                <span className="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-gray-900 dark:hover:text-white"
              >
                <FaYoutube />
                <span className="sr-only">Youtube page</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap sm:px-16 sm:justify-between justify-start mt-5">
          <div>
            {/*<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>*/}
            <ul className="text-gray-600 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr"
                    ? "Sesli Betimlemeler"
                    : "Audio Descriptions"}
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr"
                    ? "Yatırımcı İlişkileri"
                    : "Investor Relations"}
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr" ? "Yasal Hükümler" : "Legal Notices"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            {/* <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>*/}
            <ul className="text-gray-600 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline ">
                  {locale === "tr" ? "Yardım Merkezi" : "Help Center"}
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline ">
                  {locale === "tr" ? "İş İmkanları" : "Jobs"}
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline ">
                  {locale === "tr" ? "Çerez Tercihleri" : "Cookie Preferences"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            {/*<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>*/}
            <ul className="text-gray-600 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr" ? "Hediye Kartları" : "Gift Cards"}
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr" ? " Kullanım Koşulları" : "Terms of Use"}
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr"
                    ? "  Kurumsal Bilgiler"
                    : "Corporate Information"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            {/*<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>*/}
            <ul className="text-gray-600 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr" ? "Medya Merkezi" : "Media Center"}
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr" ? " Gizlilik" : "Privacy"}
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  {locale === "tr" ? "Bize Ulaşın" : "Contact Us"}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-16 dark:text-gray-400 mt-5">
          <a
            href="#"
            className="border-2 border-gray-400 p-2 cursor-pointer hover:underline"
          >
            {locale === "tr" ? "Hizmet Kodu" : "Service Code"}
          </a>
        </div>
        {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />*/}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 sm:px-16 mt-10">
            © 2023{" "}
            <a href="#" className="hover:underline">
              Netflix Clone
            </a>
            . Cloned by Emre
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
