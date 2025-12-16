import type { Songs } from '@/pages/Dashboard'
import React from 'react'




function SongsRow({songs}: {songs: Songs}) {
    return (
        <div key={songs.id} className="w-full h-14 sm:h-16 rounded-lg bg-input/30 flex items-center px-3 gap-3">
            {/* Cover */}
            <img
                src={songs.album_image}
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
            <button className="p-2 hover:bg-input/50 rounded-full">
                ▶
            </button>

            {/* 3-dot menu */}
            <button className="p-2 hover:bg-input/50 rounded-full">
                ⋮
            </button>

        </div>
    )
}

export default SongsRow