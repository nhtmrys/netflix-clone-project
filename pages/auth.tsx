import Input from "@/components/Input";
import { useCallback, useState } from "react";

export default function Auth() {
  //hooks
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  //burayı iyi anlamadım
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded ">
            <h2 className="text-4xl text-white mb-8 font-semibold">Sign in</h2>
            <div className="flex flex-col gap-4">
              <Input
                label="E-mail"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Username"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
                id="username"
                value={name}
              />
              <Input
                label="Password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id="password"
                value={password}
              />
              <button className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition">
                Login
              </button>
              <p className="text-neutral-500 mt-12">
                First time using Netflix?
                <span className="text-white ml-1 hover:underline cursor-pointer">
                  Create an account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
