import Input from "@/components/Input";
import {useCallback, useState} from "react";
import axios from "axios";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";

export default function Auth() {

    const router = useRouter();

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
    const login = useCallback(async () => {
        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/"
            })
            router.push("/")
        } catch (err) {
            console.log(err)
        }
    }, [email, password, router])

    const register = useCallback(async () => {
        try {
            await axios.post("/api/register", {
                email,
                name,
                password,
            })
            login();
        } catch (err) {
            console.log(err)
        }
    }, [email, name, password, login])


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50 ">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded ">
                        <h2 className="text-4xl text-white mb-8 font-semibold">{variant === "login" ? "Sign in" : "Create an account"}</h2>
                        <div className="flex flex-col gap-4">
                            {variant === "register" && (
                                <Input
                                    label="Username"
                                    onChange={(e: any) => {
                                        setName(e.target.value);
                                    }}
                                    id="username"
                                    value={name}
                                />
                            )}

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
                                label="Password"
                                onChange={(e: any) => {
                                    setPassword(e.target.value);
                                }}
                                id="password"
                                type="password"
                                value={password}
                            />

                            <button
                                onClick={variant === "login" ? login : register}
                                className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition">
                                {variant === "login" ? "Login" : "Sign up"}
                            </button>
                            <div className="flex flex-row items-center gap-4 mt-8 justify-center">

                                <div
                                    onClick={() => signIn("google", {callbackUrl: "/"})}
                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                    <FcGoogle size={30}/>
                                </div>
                                <div
                                    onClick={() => signIn("github", {callbackUrl: "/"})}
                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                    <FaGithub size={30}/>
                                </div>
                            </div>

                            <p className="text-neutral-500 mt-12">
                                {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
                                <span onClick={toggleVariant}
                                      className="text-white ml-1 hover:underline cursor-pointer">
                  {variant === "login" ? "Create an account" : "Sign in"}
                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
