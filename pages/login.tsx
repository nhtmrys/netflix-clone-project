import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Head from "next/head";
import useMovieList from "@/hooks/useMovieList";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { BsChevronDown } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { Fragment } from "react";
import LanguageSelect from "@/components/LanguageSelect";
import { useRouter } from "next/router";

export default function Login() {
  const { error: user = [] } = useCurrentUser();
  //hooks
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  //burayı iyi anlamadım
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: locale === "en" ? "/profiles" : "/tr/profiles",
      });
    } catch (err) {
      console.log(err);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50 ">
          <nav className="max-w-7xl mx-auto py-5 flex justify-between">
            <img src="/images/logo.png" alt="Logo" className="h-12" />
            <div
              onClick={() => setShowLanguagePopup(!showLanguagePopup)}
              className="text-white flex flex-row items-center gap-2 border-2 p-2 cursor-pointer relative"
            >
              <p>
                <TbWorld />
              </p>
              <p className="hidden sm:block">
                {locale === "en" ? "English" : "Türkçe"}
              </p>

              <p>
                <BsChevronDown />
              </p>
              <LanguageSelect visible={showLanguagePopup} locale={locale} />
            </div>
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded ">
              <h2 className="text-4xl text-white mb-8 font-semibold">
                {variant === "login"
                  ? locale === "en"
                    ? "Sign in"
                    : "Giriş Yap"
                  : locale === "en"
                  ? "Create an account"
                  : "Hesap Oluştur"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    label={locale === "en" ? "Username" : "Kullanıcı Adı"}
                    onChange={(e: any) => {
                      setName(e.target.value);
                    }}
                    id="username"
                    value={name}
                  />
                )}

                <Input
                  label={locale === "en" ? "E-mail" : "E-posta"}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label={locale === "en" ? "Password" : "Şifre"}
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  value={password}
                />

                <button
                  onClick={variant === "login" ? login : register}
                  className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition"
                >
                  {variant === "login"
                    ? locale === "en"
                      ? "Login"
                      : "Giriş Yap"
                    : locale === "en"
                    ? "Sign up"
                    : "Kayıt Ol"}
                </button>
                <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                  <div
                    onClick={() =>
                      signIn("google", {
                        callbackUrl:
                          locale === "en" ? "/profiles" : "/tr/profiles",
                      })
                    }
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  >
                    <FcGoogle size={30} />
                  </div>
                  <div
                    onClick={() =>
                      signIn("github", {
                        callbackUrl:
                          locale === "en" ? "/profiles" : "/tr/profiles",
                      })
                    }
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  >
                    <FaGithub size={30} />
                  </div>
                </div>

                <p className="text-neutral-500 mt-12">
                  {variant === "login"
                    ? locale === "en"
                      ? "First time using Netflix?"
                      : "Netflix'i ilk kez mi kullanıyorsunuz?"
                    : locale === "en"
                    ? "Already have an account?"
                    : "Zaten bir hesabınız var mı?"}
                  <span
                    onClick={toggleVariant}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    {variant === "login"
                      ? locale === "en"
                        ? "Create an account"
                        : "Hesap oluştur"
                      : locale === "en"
                      ? "Sign in"
                      : "Giriş yap"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
