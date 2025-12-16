
import { useEffect, useState } from "react"
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Album, Search } from "lucide-react"
import SongRowSkeleton from "@/components/SongRowSkeleton"
import SongsRow from "@/components/SongsRow"
import PlayBackBar from "@/components/playBackBar"

export default function Dashboard() {

    const [songs, setSongs] = useState<Songs[]>([])



    useEffect(() => {
        (async () => {
            const response = await axios.get("http://localhost:3000/");
            setSongs(response.data.songs)
        })()
    }, [])








    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="relative w-full h-14 sm:h-16 flex items-center px-2 sm:px-4">
                {/* Logo - Left */}
                <div className="absolute left-5 sm:left-4 h-full sm:h-12 w-32 rounded-2xl  overflow-hidden flex items-center justify-center">
                    <img
                        src="/Logo/Logo.png"
                        alt="LiveListen logo"
                        className="w-full h-full"
                    />
                </div>

                {/* Search - Center */}
                <div className="mx-auto w-full max-w-3xl flex items-center gap-2">
                    <Input
                        className="border-none w-full text-sm sm:text-base"
                        placeholder="Search Song"
                    />
                    <Button type="button" className="shrink-0" variant="secondary">
                        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                </div>
            </header>

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
                                ablumArray.map((albums, id) => (
                                    <div key={id} className={`w-55 aspect-square rounded-xl bg-[url(${albums.imageUrl})] bg-center bg-no-repeat bg-cover`}></div>
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
                                <SongsRow key={songs.id} songs={songs} />
                            )) : Array.from({ length: 50 }).map(() => (<SongRowSkeleton />))}
                        </div>
                    </section>
                </div>



                <div className="w-full  lg:flex-1 h-full bg-input/10 rounded-xl p-3 bg-[url('/Backgrounds/JammingBg')] bg-no-repeat bg-center bg-cover flex flex-col gap-4 ">
                
                   <PlayBackBar/>


                    <div className="border-2 flex-1 h-72  bg-center bg-cover bg-no-repeat rounded-xl backdrop-blur-md ">


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