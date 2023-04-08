import React from "react";
import useMovie from "@/queryHooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Head from "next/head";
const Watch = () => {
  const router = useRouter();
  const { locale } = router;
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  return (
    <div className="h-screen w-screen bg-black">
        <Head>
            <title>Netflix</title>
            <meta name="description" content="Netflix homepage" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => router.push("/")}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light ">{locale==="en"?"Watching: ":"İzleniyor: "}</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="w-full h-full "
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
