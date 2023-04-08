import React, {useCallback, useEffect, useState} from "react";
import useBillboard from "@/queryHooks/useBillboard";
import {AiOutlineInfoCircle} from "react-icons/ai";
import PlayButton from "@/components/PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import {RxSpeakerOff, RxSpeakerQuiet} from "react-icons/rx";
import {Simulate} from "react-dom/test-utils";


const Billboard = ({locale, router}: any) => {
    const {isLoading, data} = useBillboard();
    const {openModal} = useInfoModal();
    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id]);
    const [isMuted, setIsMuted] = useState(true);


    if (isLoading) {
        return (
            <div className="h-screen w-screen bg-black flex items-center justify-center">
                <img src="https://i.gifer.com/8Etj.gif" alt=""/>
            </div>
        );
    }

    return (
        <div className="relative h-[56.25vw]">
            <video
                className="w-full h-[56.25vw] object-cover brightness-[60%]"
                autoPlay
                poster={data?.thumbnailUrl}
                src={data?.videoUrl}
                muted={isMuted}
                loop
            ></video>
            <button
                    className=" absolute bottom-56 right-20 bg-white rounded-full p-4 md:p-2 md:p-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
                    onClick={() => (setIsMuted(!isMuted))}>{isMuted ? <RxSpeakerOff/> : <RxSpeakerQuiet/>}</button>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {data?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[80%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {data?.description}
                </p>

                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton router={router} locale={locale} movieId={data?.id}/>
                    <button
                        onClick={handleOpenModal}
                        className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
                    >
                        <AiOutlineInfoCircle className="mr-1 "/>{" "}
                        {locale === "en" ? "More Info" : "Daha fazla"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Billboard;
