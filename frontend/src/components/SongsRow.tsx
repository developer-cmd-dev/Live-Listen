import type { Songs } from '@/pages/Dashboard'
import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import {useSongState} from '@/store/zustand'
import { EllipsisVertical, Menu, Play, UserStar } from 'lucide-react';

interface SongsData {
    songs:Songs;
    playSongs:(id:number,songsData:Songs)=>void;
    activeSong:number|null;
}



function SongsRow({songs,playSongs,activeSong}:SongsData) {

 
    




    return (
        <div className={`w-full h-14 sm:h-16 rounded-lg bg-input/30 flex items-center px-3 gap-3 ${activeSong == songs.id ? "bg-input/70":"bg-input/30"} `}>
            {/* Cover */}
            <img
                src={songs.album_image||"image not found"}
                alt="cover"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded"
            />

            {/* Name + Artist */}
            <div className="flex-1 flex flex-col justify-center overflow-hidden">
                <p className="text-sm font-medium truncate">
                    {songs.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                    {songs.artist_name}
                </p>
            </div>
            {/* Duration */}
            <span className="hidden sm:block text-xs text-muted-foreground">
                {(songs.duration / 60).toFixed(2)}
            </span>

            {/* Play */}
            <Button onClick={()=>playSongs(songs.id,songs)}  variant={"ghost"} className="p-2 hover:bg-input/50 rounded-full">
               <Play/>
            </Button>

            {/* 3-dot menu */}
               <Button title='menu'    variant={"ghost"} className="p-2 
                hover:bg-input/50 rounded-full">
               <EllipsisVertical/>
            </Button>

        </div>
    )
}

export default SongsRow


