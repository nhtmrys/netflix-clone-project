import React, {useEffect, useState} from 'react';
import Navbar from "@/components/Navbar";
import {useRouter} from "next/router";
import useMovieList from "@/queryHooks/useMovieList";
import Head from "next/head";
import Footer from "@/components/Footer";
import useCurrentUser from "@/hooks/useCurrentUser";
import {NextPageContext} from "next";
import {getSession} from "next-auth/react";
import Input from "@/components/Input";


export default function Account() {

    const { data: user } = useCurrentUser();
    const {data: movies = []} = useMovieList();
    const router = useRouter();
    const {locale} = router;
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [success,setSuccess] = useState(false);
    const handleChangeEmail = async (e:any) => {
        e.preventDefault();

        try {
            // API endpointine isteği gönder
            console.log("istek gönderildi")
            const response = await fetch('/api/changeEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            // Yanıtı kontrol et ve gerekirse işlemleri yap
            console.log(response.ok)
            setSuccess(response.ok)
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if(success){
            setIsOpen(false)
        }
    }, [success])

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <Head>
                <title>Netflix</title>
                <meta name="description" content="Netflix homepage"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar locale={locale} movies={movies} sticky={false}/>
            <div className="bg-white mt-24">
                <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500">
                    <h1 className="text-2xl font-semibold ">{locale === "en" ? "Account" : "Hesap"}</h1>
                </div>
                <div className="px-4 md:px-16 flex flex-row justify-between flex-wrap">
                    <div className="flex flex-col gap-2 items-start transition duration-500 text-gray-400">
                        {locale === "en" ? "MEMBERSHIP & BILLING" : "ABONELİK VE ÖDEME"}
                        <button className="bg-gray-200 p-2 transition duration-500 text-black shadow-xl border-b border-neutral-200">
                            {locale === "en" ? "Cancel Membership" : "Aboneliği iptal et"}
                        </button>
                    </div>
                    <div className="flex flex-col">
                    <div className="flex flex-col justify-between w-full sm:w-[1050px] flex-wrap">
                        <div className="flex flex-row justify-between">
                            <p className="font-semibold">
                                {user?.email}
                            </p>
                            <a className="text-blue-600  cursor-pointer" onClick={()=>togglePopup()}>
                                {locale === "en" ? "Change email" : "Eposta değiştir"}
                            </a>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-gray-400">
                                {locale === "en" ? "Password: ********" : "Şifre: ********"}
                            </p>
                            <a className="text-blue-600 cursor-pointer">
                                {locale === "en" ? "Change password" : "Şifre değiştir"}
                            </a>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-gray-400">
                                {locale === "en" ? `Phone Number: ${user?.phone===undefined?"-":user?.phone}` : `Telefon Numarası: ${user?.phone===undefined?"-":user?.phone}`}
                            </p>
                            <a className="text-blue-600 cursor-pointer">
                                {locale === "en" ? "Change phone number" : "Telefon numarası değiştir"}
                            </a>
                        </div>
                        <hr className="my-5 border-2"/>
                    </div>
                    <div className="flex flex-col justify-between w-full sm:w-[1050px] flex-wrap]">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                            <p className="font-semibold">
                                {locale === "en" ? "Redeem Gift Card or Promo Code" : "Hediye kartı veya promosyon kodu kullan"}
                            </p>
                                <div className="flex flex-row gap-2">
                            <input placeholder={locale==="en"?"Enter code or pin...":"Kodunuzu girin..."} className="border-2 p-2 " type="text"/>
                                <button className="p-2 bg-gray-100">{locale==="en"? "Redeem":"Kullan"}</button>
                                </div>
                            </div>
                            <a className="text-blue-600 cursor-pointer">
                                {locale==="en"? "Where to find your code?":"Kodunuzu nereden bulabilirsiniz?"}
                            </a>
                        </div>

                    </div>

                    </div>

                </div>
                <hr className="m-10 border-2"/>
                <div className="px-4 md:px-16 flex flex-row justify-between">
                    <div className="flex flex-col gap-2 items-start transition duration-500 text-gray-400">
                        {locale==="en"? "MY PROFILE":"PROFİLİM"}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col justify-between w-full sm:w-[1050px] flex-wrap ">
                            <div className="flex flex-row justify-between">
                            <div className="flex flex-row justify-start gap-4">
                                <img className="w-12" src={user?.image} alt=""/>
                                <a className="text-zinc-800">
                                    {user?.name}
                                </a>
                            </div>
                            <a href="/profiles" className="text-blue-600 cursor-pointer">
                                {locale==="en"?"Manage Profiles":"Profilleri yönet"}
                            </a>
                            </div>
                            <hr className="border-2 my-10"/>
                        </div>

                    </div>

                </div>
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded shadow-lg relative">
                            <h2 className="text-2xl font-semibold mb-4">{locale === "en" ? "Change Email" : "Eposta değiştir"}</h2>
                            <form onSubmit={handleChangeEmail}>
                                <div>
                            <Input value={email} type="email" id={"email"} label={locale === "en" ? "E-mail" : "E-posta"} onChange={(e:any)=>setEmail(e.target.value)}></Input>
                                </div>
                                <button
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    type="submit"
                                >{locale === "en" ? "Submit" : "Gönder"}</button>
                            </form>

                            <button
                                className="absolute right-2 top-2"
                                onClick={togglePopup}
                            >
                                X
                            </button>
                        </div>
                    </div>
                )}

            </div>
            <Footer locale={locale}/>
        </>
    );

};
export async function getServerSideProps(context: NextPageContext) {
    const { locale } = context;
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: `/${locale}/login`,
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}