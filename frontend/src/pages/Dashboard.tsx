
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


    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev < album.length - 1) {
                    return prev + 1;
                } else {
                    return 0;
                }
            });
        }, 10000);

        return () => clearInterval(interval); // cleanup
    }, [album.length]);








    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">

                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />


                    <SongSearch />



                </header>

                <div className="flex flex-1   gap-4 p-4  w-full ">
                    <div className="  flex   flex-col gap-4  h-[90vh] w-full  md:w-[70%] ">
                        <div className={`bg-muted/50 min-h-[100vh]   flex-1 item-center justify-center  rounded-xl md:min-h-min  `}>
                        </div>
                        <div className="flex overflow-scroll  flex-1 flex-col gap-4 p-4">
                            {Array.from({ length: 24 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block h-full bg-gray-800 rounded-xl w-[30%] p-4">
                        <h1>This anohter div</h1>
                    </div>

                </div>



            </SidebarInset>
        </SidebarProvider>
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