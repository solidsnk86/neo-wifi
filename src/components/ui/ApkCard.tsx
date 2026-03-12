"use client";

import { getIP } from "@/utils/get-ip";
import { useCallback } from "react";


export const ApkCard = () => {

    const sendDataAPKDownload = useCallback(async () => {
        const { ip, cityName, countryName, sysInfo } = await getIP();
        const data = {
            ip,
            city: cityName,
            country: countryName,
            so: sysInfo.system,
            browser: sysInfo.webBrowser.browser
        }
        try {
            setTimeout(async () => {
                await fetch("/api/apk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
            }, 400)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="border-2 my-5 bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary overflow-hidden backdrop-blur-xl z-50">
            <article className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-xl p-3">
                <div className="flex flex-col justify-center mx-auto items-center">
                    <span className="px-4 bg-amber-400/80 border border-amber-400 rounded-full w-fit font-semibold">
                        Nuevo
                    </span>
                    <h2 className="font-bold text-2xl text-center mt-1">
                        Nueva app de Neo WiFi para Android
                    </h2>
                </div>
                <p className="my-6 text-pretty font-thin text-center">
                    Descubrí la nueva aplicación oficial de Neo WiFi. Encontrá puntos de acceso
                    gratuitos cerca de tu ubicación en tiempo real, consultá la distancia exacta
                    a cada antena y conectate fácilmente a las redes públicas del gobierno.
                </p>
                <div className="relative flex justify-center mx-auto border-2 border-black w-fit rounded-3xl">
                    <div className="absolute -right-[6px] top-40 w-[6px] h-12 bg-gradient-to-r from-[#4a4948] via-[#6B6867] to-[#8A8786] border-2 border-black/90 rounded-tr-md rounded-br-md z-30"></div>
                    <div className="absolute -right-[6px] top-[216px] w-[6px] h-24 bg-gradient-to-r from-[#4a4948] via-[#6B6867] to-[#8A8786] border-2 border-black/90 rounded-tr-md rounded-br-md z-30"></div>
                    <div className="absolute -right-[6px] top-80 w-[6px] h-12 bg-gradient-to-r from-[#4a4948] via-[#6B6867] to-[#8A8786] border-2 border-black/90 rounded-tr-md rounded-br-md z-30"></div>
                    <div className="relative border-[3px] border-[#6B6867] rounded-3xl">
                        <div className="relative w-[400px] h-[800px] border-2 border-black rounded-[22px]">
                            <div className="absolute top-3 left-[50%] -translate-x-[50%] w-5 h-5 rounded-full bg-black">
                                <div className="w-3 h-3 rounded-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-blue-950/50">
                                    <div className="w-3 h-3 rounded-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-red-950/20">
                                        <div className="absolute top-[1.5px] left-[2px] w-[1px] h-[4px] opacity-5 border-l-2 border-t-2 border-b-1 border-r-2 border-r-transparent border-b-transparent rounded-full rotate-[25deg]"></div>
                                        <div className="absolute bottom-[1.5px] right-[2px] w-[0px] h-[4px] opacity-5 border-l-2 border-t-1 border-b-2 border-r-2 border-l-transparent border-t-transparent rounded-full rotate-[28deg]"></div>
                                    </div>
                                </div>
                            </div>
                            <video
                                className="rounded-xl absolute top-0 left-0 -z-10 object-fill w-full h-full"
                                src="/assets/neo-wifi-apk.mp4"
                                autoPlay
                                loop
                                muted
                            />
                        </div>
                    </div>

                </div>
                <div className="relative w-fit justify-center mx-auto group my-6">
                    <a
                        onClick={sendDataAPKDownload}
                        href="/neo-wifi-2.0.0.apk"
                        download={"NeoWifi_2.0.apk"}
                        className="group flex gap-2 py-3 px-4 border border-zinc-300/70 dark:border-zinc-800 rounded-full text-white dark:text-zinc-900 bg-zinc-800 dark:bg-zinc-100 cursor-pointer hover:opacity-80 overflow-y-hidden"
                    >
                        <svg role="img"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            fill="#3DDC84"
                            xmlns="http://www.w3.org/2000/svg"
                            className="translate-y-[130%] group-hover:translate-y-0 transition-transform duration-500"
                        >
                            <title>Android</title>
                            <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
                        </svg>
                        <span className="-translate-x-[18px] group-hover:translate-x-0 transition-transform duration-500">Descargar APK</span>
                    </a>
                </div>
            </article>
        </div>
    )
}