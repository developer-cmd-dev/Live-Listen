
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import SongSearch from "@/components/song-search"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from "@/components/ui/card";
import { Badge } from "lucide-react"
export default function Dashboard() {

    const [album, setAlbum] = useState<Album[]>([])
    const [count, setCount] = useState<number>(0)



    useEffect(() => {
        (async () => {
            const response = await axios.get("http://localhost:3000/");
            const album: Album[] = response.data.album;
            setAlbum(album);

        })()
    }, [])








    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="w-full h-14 sm:h-16 flex items-center justify-center px-2 sm:px-4">
                <div className="w-full max-w-3xl flex items-center gap-2">
                    <Input
                        className="border-none w-full text-sm sm:text-base"
                        placeholder="Search Song"
                    />
                    <Button
                        type="button"
                        className="shrink-0"
                        variant="secondary"
                    >
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
                            <div className="w-60 aspect-square rounded-xl bg-[url(/SongsConver/Cover1.jpg)] bg-center bg-no-repeat bg-cover"></div>
                            <div className="w-60 aspect-square rounded-xl bg-[url(/SongsConver/Cover1.jpg)] bg-center bg-no-repeat bg-cover"></div>
                            <div className="w-60 aspect-square rounded-xl bg-[url(/SongsConver/Cover1.jpg)] bg-center bg-no-repeat bg-cover"></div>
                            <div className="w-60 aspect-square rounded-xl bg-[url(/SongsConver/Cover1.jpg)] bg-center bg-no-repeat bg-cover"></div>
                        </div>
                    </section>

                    {/* Songs */}
                    <section className="flex flex-col flex-1 space-y-4 min-h-0">
                        <h1 className="border-b pb-2 text-sm sm:text-md font-semibold tracking-tight">
                            Songs
                        </h1>

                        {/* ONLY this scrolls */}
                        <div className="flex-1 overflow-auto flex flex-col gap-3">
                            <div className="w-full h-14 sm:h-16 rounded-lg bg-input/30 flex items-center px-3 gap-3">
                                {/* Cover */}
                                <img
                                    src="/SongsConver/Cover1.jpg"
                                    alt="cover"
                                    className="h-10 w-10 sm:h-12 sm:w-12 rounded"
                                />

                                {/* Name + Artist */}
                                <div className="flex-1 flex flex-col justify-center overflow-hidden">
                                    <p className="text-sm font-medium truncate">
                                        Tum Hi Ho
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        Arijit Singh
                                    </p>
                                </div>
                                {/* Duration */}
                                <span className="hidden sm:block text-xs text-muted-foreground">
                                    4:22
                                </span>

                                {/* Play */}
                                <button className="p-2 hover:bg-input/50 rounded-full">
                                    ▶
                                </button>

                                {/* 3-dot menu */}
                                <button className="p-2 hover:bg-input/50 rounded-full">
                                    ⋮
                                </button>

                            </div>

                        </div>
                    </section>
                </div>



                <div className="w-full lg:flex-1 h-full bg-input/10  rounded-md overflow-auto">
                </div>
            </main>

        </div>

    )
}



interface Album {
    id: number;
    name: string;
    releasedate: string;
    artist_id: string;
    artist_name: string;
    image: string;
    zip: string;
    shorturl: string;
    shareUrl: string;
    zip_allowed: boolean,
    createdAt: string;
    updatedAt: string;
}