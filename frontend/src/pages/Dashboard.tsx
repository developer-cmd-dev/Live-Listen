
import { useEffect, useState } from "react"
import axios, { AxiosError, toFormData } from 'axios'
import SongRowSkeleton from "@/components/SongRowSkeleton"
import SongsRow from "@/components/SongsRow"
import PlayBackBar from "@/components/playBackBar"
import { toast } from "sonner"
import { useAuthentication, useHandleCurrentSong, useIsPlaying, useRoomState, useSongState } from "@/store/zustand"
import Navbar from "@/components/Navbar"
import { RoomAccess, type RoomAccessOptions } from "@/components/RoomAccess"
import Chat from "@/components/Chat"
import { motion } from 'motion/react'
import { w3cwebsocket } from 'websocket'
import type { CreatedRoomResponse, RoomType, SocketConnection } from "@/types/types"
import { FastForward, Ghost, Music3, User, User2, Users } from "lucide-react"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { Button } from "@/components/ui/button"
import VinylIcon from "@/components/ui/vinyl-icon"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogHeader } from "@/components/ui/dialog"
import CreateRoom from "@/components/CreateRoom"
import { useSocket } from "@/hooks/useSocket"

export default function Dashboard() {
    const webSocketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
    const [songs, setSongs] = useState<Songs[]>([])
    const [activeSong, setActiveSong] = useState<number | null>(null)

    const { userData } = useAuthentication((state) => state)
    const [roomId, setRoomId] = useState<number | null>(null)
    const socket = useSocket(webSocketUrl);
    const { setRoomData,roomData } = useRoomState((state) => state);



    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:3000/");
                setSongs(response.data.songs);
                const lastPlayedSong = await JSON.parse(localStorage.getItem('last-played-song') || "");
                setSong(lastPlayedSong)
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.message);
                }
            }
        })()
    }, [])

    useEffect(() => {

            if(!socket|| userData==null||socket.readyState !== WebSocket.OPEN) return;
      
            const accessToken = localStorage.getItem('access-token');
            const getLastCreatedRoomId=localStorage.getItem("last-created-roomid");
                const data = {
                    type: "connect",
                    data: {
                        email: userData?.email,
                        userId: userData?.id,
                        accessToken: accessToken,
                        roomId:Number(getLastCreatedRoomId)
                    }
                }

                socket.send(JSON.stringify(data));
                socket.onmessage = (data: any) => {
                    const success = JSON.parse(data.data as string) as SocketConnection;
                    const roomData:RoomType|null= success.data as RoomType;
                    if(!roomData){
                        setIsRoomCreated(false);
                    }else{
                    setRoomData(roomData);
                    setIsRoomCreated(true)
                    }
                    
                    if (!success.success) toast.error(success.message);
                }

             

    }, [socket])




    const setSong = useSongState((state) => state.setSong)
    const setIsPlayCurrentSong = useHandleCurrentSong((state) => state.setIsPlayCurrentSong)
    const { isPlaying, setIsPlaying } = useIsPlaying((state) => state);

    const [isRoomCreated, setIsRoomCreated] = useState(false);





    const playSong = (id: number, songData: Songs) => {
        setActiveSong(id);
        setSong(songData);
        setIsPlayCurrentSong(true);
        localStorage.setItem("last-played-song", JSON.stringify(songData))
        setIsPlaying(!isPlaying);
    }


    const nextSong = () => {

        if (activeSong && activeSong < songs.length) {
            setActiveSong(activeSong + 1)
            handlePrevNext()
        }

    }

    const previousSong = () => {
        if (activeSong && activeSong > 0) {
            setActiveSong(activeSong - 1)
            handlePrevNext()

        }

    }

    const handlePrevNext = () => {
        if (activeSong) {
            setSong(songs[activeSong]);
            setIsPlayCurrentSong(true);
            localStorage.setItem("last-played-song", JSON.stringify(songs[activeSong]))
        }
    }


    const handleRoomCreate = () => setIsRoomCreated((prev) => !prev);



    const createRoom = async () => {
        try {

            socket.send(JSON.stringify({ type: 'create', data: { roomName: "My room", isPrivate: true, enabledChat: true, userLimit: 3 } }));
            socket.onmessage = (data) => {
                const response = JSON.parse(data.data.toString()) ;
                localStorage.setItem("last-created-roomid",response.data.roomId);
                setRoomData(response.data);
                setIsRoomCreated(true)
            }
        } catch (error) {
            console.log(error)
        }

    }


    const exitRoom = ()=>{
        setIsRoomCreated(false);
        console.log(roomData)
       socket.send(JSON.stringify({ type: 'close', data: { roomId: roomData?.roomId, userId: userData?.id, roomType:roomData?.roomType} }));

       socket.onmessage=(data)=>{
        console.log(data.data)
       }
    }






    return (
        <div className="h-screen flex flex-col">


            {/* Main */}
            <main className="flex-1 flex flex-col md:flex-col lg:flex-row gap-4 justify-center overflow-hidden p-3 ">
                <div className="grid grid-cols-1 lg:grid-cols-10 grid-rows-[1fr_auto] gap-4 w-full h-full flex-1">
                    <div
                        className="col-span-1 lg:col-span-8 row-span-1 h-full rounded-md overflow-auto bg-input/17 p-4 sm:p-5 space-y-6 custom-scrollbar"
                        style={{
                            scrollbarColor: "#222  #111",
                        }}
                    >
                        <section className="space-y-4">
                            <h1 className="border-b pb-2 text-sm sm:text-md font-semibold tracking-tight">
                                Albums
                            </h1>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {
                                    ablumArray.map((albums) => (
                                        <div key={albums.id} className={`w-68 aspect-square rounded-xl bg-center bg-no-repeat bg-cover`}
                                            style={{
                                                backgroundImage: `url(${albums.imageUrl})`
                                            }}>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                        <section className="flex flex-col flex-1 space-y-4 min-h-0">
                            <h1 className="border-b pb-2 text-sm sm:text-md font-semibold tracking-tight">
                                Songs
                            </h1>
                            <div
                                className="flex-1 overflow-auto flex flex-col gap-3 custom-scrollbar"
                                style={{
                                    scrollbarColor: "#222  #111"
                                }}
                            >
                                {songs?.length > 0 ? songs?.map((songs) => (
                                    <SongsRow
                                        activeSong={activeSong}
                                        playSongs={playSong}
                                        key={songs.id}
                                        songs={songs}
                                    />
                                )) : skeletonArray.map((data) => (<SongRowSkeleton key={data} />))}
                            </div>
                        </section>
                    </div>


                    <div className="col-span-1 lg:col-span-2 row-span-1   h-full rounded-md bg-none flex flex-col gap-4 min-w-[260px] max-w-xs">
                        <div
                            className="bg-input/20 flex-1 bg-center bg-cover bg-no-repeat rounded-md  backdrop-blur-md"
                        >

                            <div className=" w-full h-15 border-b flex items-center  px-4 gap-5">
                                <VinylIcon size={35} />
                                <h1 >Listen Together</h1>
                            </div>

                            {!isRoomCreated  ? (<div className="col-span-1  lg:col-span-2 row-span-1  flex justify-center items-center h-145">
                                <div className="flex flex-col px-5 items-center justify-center w-full gap-7  ">
                                    <div className="w-full flex-col gap-1 flex items-center justify-center">

                                        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-5xl dark:text-neutral-100">
                                            Listen Together
                                        </h2>
                                        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500 text-sm">
                                            Bring your friends together to enjoy your favorite songs in real-time. Create or join a room and listen to music together, chat live, and share the experience. Start a musical journey—because listening is always better with friends!
                                        </p>
                                    </div>

                                    <div className="w-full flex items-center justify-center gap-3">


                                        <Button onClick={createRoom}>
                                            Create Room
                                        </Button>

                                        <Button variant={"outline"}>
                                            Join Room
                                        </Button>
                                    </div>

                                </div>
                            </div>
                            ) : <CreateRoom exitRoom={exitRoom} />}


                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-10 row-span-1 px">
                        <div className="bg-input/20 px-3 flex flex-col h-24 rounded-md ">
                            <PlayBackBar nextSong={nextSong} previousSong={previousSong} />
                        </div>

                    </div>
                </div>
            </main>

        </div>

    )
}



export interface Songs {
    id: number;
    name: string;
    duration: number;

    artist_id: string;
    artist_name: string;
    artist_idstr: string;

    album_name: string;
    album_id: string;
    album_image: string;

    position: number;
    releasedate: string;
    license_ccurl: string;

    audio: string;
    audiodownload: string;
    audiodownload_allowed: boolean;

    prourl: string;
    shorturl: string;
    shareurl: string;

    image: string;

    content_id_free: boolean;

    createdAt: string;
    updatedAt: string;
}

export const ablumArray = [
    {
        id: 1,
        imageUrl: "https://i.pinimg.com/736x/a9/44/89/a944896af0b216796ae695e7bdb7cfab.jpg"
    },
    {
        id: 2,
        imageUrl: "/SongsConver/Cover1.jpg"
    },
    {
        id: 3,
        imageUrl: "https://i.pinimg.com/736x/60/9a/80/609a8061a8ae93f2735f3e3e20190b90.jpg"
    },
    {
        id: 4,
        imageUrl: "https://m.media-amazon.com/images/I/81Tw4klE3nL._USNaN_BL10_BG34,34,34_CLa%7CNaN,NaN%7C81Tw4klE3nL.jpg,81KvkEtJBZL.jpg,918xRUqnGBL.jpg,91Fervhn2UL.jpg%7C0,0,NaN,NaN+0,0,NaN,NaN+NaN,0,NaN,NaN+0,NaN,NaN,NaN+NaN,NaN,NaN,NaN.jpg"
    },


]


const skeletonArray = [1, 2, 3, 4]

