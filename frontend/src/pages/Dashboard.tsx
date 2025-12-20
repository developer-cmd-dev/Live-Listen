
import { useEffect, useState } from "react"
import axios, { AxiosError } from 'axios'
import SongRowSkeleton from "@/components/SongRowSkeleton"
import SongsRow from "@/components/SongsRow"
import PlayBackBar from "@/components/playBackBar"
import { toast } from "sonner"
import { useHandleCurrentSong, useIsPlaying, useSongState } from "@/store/zustand"
import Navbar from "@/components/Navbar"

export default function Dashboard() {

    const [songs, setSongs] = useState<Songs[]>([])
    const [playingSong, setPlayingSong] = useState<number | null>(null)

    



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

    const setSong = useSongState((state) => state.setSong)
    const setIsPlayCurrentSong = useHandleCurrentSong((state) => state.setIsPlayCurrentSong)
    const {isPlaying,setIsPlaying}=useIsPlaying((state)=>state);


    const playSong = (id: number, songData: Songs) => {
        setPlayingSong(id);
        setSong(songData);
        setIsPlayCurrentSong(true);
        localStorage.setItem("last-played-song", JSON.stringify(songData))
        setIsPlaying(!isPlaying);
    }


  








    return (
        <div className="h-screen flex flex-col">
            {/* Header */}

            <Navbar />
            {/* Main */}
            <main className="flex-1 flex flex-col md:flex-col lg:flex-row gap-4 justify-center overflow-hidden p-3 ">
                <div className="w-full lg:flex-[2] h-full rounded-md overflow-auto bg-input/10 p-4 sm:p-5 space-y-6">

                    {/* Albums */}
                    <section className="space-y-4">
                        <h1 className="border-b pb-2 text-sm sm:text-md font-semibold tracking-tight">
                            Albums
                        </h1>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                ablumArray.map((albums) => (
                                    <div key={albums.id} className={`w-55  aspect-square rounded-xl  bg-center bg-no-repeat bg-cover`}
                                        style={{
                                            backgroundImage: `url(${albums.imageUrl})`
                                        }}>

                                        </div>
                                ))
                            }

                        </div>
                    </section>

                    {/* Songs */}
                    <section className="flex flex-col flex-1 space-y-4 min-h-0">
                        <h1 className="border-b pb-2 text-sm sm:text-md font-semibold tracking-tight">
                            Songs
                        </h1>

                        {/* ONLY this scrolls */}
                        <div className="flex-1 overflow-auto flex flex-col gap-3">

                            {songs?.length > 0 ? songs?.map((songs) => (
                                <SongsRow 
                                activeSong={playingSong} 
                                playSongs={playSong} 
                                key={songs.id} 
                                songs={songs} 
                                />
                            )) :skeletonArray.map((data) => (<SongRowSkeleton key={data} />))}
                        </div>
                    </section>
                </div>



                <div className="w-full  lg:flex-1 h-full rounded-xl  bg-none flex flex-col gap-4 ">

                    <div className="bg-input/30  flex-1 flex flex-col h-72   rounded-xl backdrop-blur-md p-4 ">
                        <PlayBackBar />

                    </div>


                    <div className="bg-input/30 flex-1 h-72  bg-center bg-cover bg-no-repeat rounded-xl backdrop-blur-md ">


                    </div>
                </div>
            </main>

        </div>

    )
}



export interface Songs {
    id: number;
    name: string;
    duration: number; // seconds

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

const ablumArray = [
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


const skeletonArray = [1,2,3,4]

