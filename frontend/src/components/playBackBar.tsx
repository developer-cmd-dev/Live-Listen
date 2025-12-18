import { useState } from "react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Shuffle, ChevronFirst, ChevronLast, Play, Repeat, Volume2 } from "lucide-react"
import type { Songs } from "@/pages/Dashboard"
import useSongState from "@/store/zustand"
function PlayBackBar() {



  const song=useSongState((state)=>state.song);

  


  




  return (

    <div className=" border-2 flex-1 flex flex-col h-72   rounded-xl backdrop-blur-md p-4 ">

      <div className="  flex  gap-2 flex-1 h-[70%]">


        <section className=" h-full flex-1/2">
          <img className="w-full h-full rounded-full border-none" src={song?.image} alt="Non" />

        </section>

        <section className="h-full flex-1/2 p-4 flex flex-col justify-center gap-2 overflow-hidden">
          <h1 className="text-2xl sm:text-3xl font-medium font-[cursive] truncate">
            {song?.name}
          </h1>

          <p className="text-base sm:text-lg text-white/60 truncate">
            {song?.artist_name}
          </p>

          <p className="text-sm sm:text-base text-white/40 truncate">
           {song?.album_name}
          </p>

          <div className="flex items-center gap-3 mt-2 text-sm text-white/50">
            <span>{((song?.duration||0)/60).toFixed(2)}</span>

          </div>
        </section>


      </div>

      <div className=" h-full flex flex-col justify-center gap-3">

        {/* Progress bar */}
        <div className="flex items-center gap-3 text-xs  text-white/60">
          <Slider defaultValue={[0]} max={100} step={1} />

        </div>



        {/* Controls */}
        <div className="flex items-center justify-between">

          {/* Left menu */}
          <div className="flex items-center gap-4 text-white/70">
            <Button variant={"default"}><Shuffle /></Button>
            <Button variant={"default"}><Repeat /></Button>

          </div>

          {/* Main controls */}
          <div className="flex items-center gap-5">
            <Button variant={"default"}><ChevronFirst /></Button>
            <Button variant={"default"}><Play /></Button>
            <Button variant={"default"}><ChevronLast /></Button>
          </div>

          {/* Right menu */}
          <div className="flex items-center gap-4 w-[7vw]  text-white/70">
            <Slider defaultValue={[0]} max={100} step={1} />
            <Volume2 size={40} />

          </div>

        </div>
      </div>




    </div>

  )
}

export default PlayBackBar