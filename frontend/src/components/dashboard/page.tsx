
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"

import SongSearch from "../song-search"
export default function Page() {
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
                    <div className="flex   flex-col gap-4 w-full  md:w-[70%] ">
                        <div className="bg-muted/50 min-h-[100vh]  flex-1 rounded-xl md:min-h-min" />
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                            <div className="bg-muted/50 aspect-video rounded-xl" />
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
