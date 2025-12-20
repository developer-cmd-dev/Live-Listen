import { useActionState, useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Shuffle, ChevronFirst, ChevronLast, Play, Repeat, Volume2, Palette, Currency, Pause, StepForward } from "lucide-react"
import {useHandleCurrentSong, useSongState} from "@/store/zustand"
import { Progress } from "./ui/progress"
import { Input } from "./ui/input"
function PlayBackBar() {



  const song = useSongState((state) => state.song);
  const isPlayingCurrentSong = useHandleCurrentSong((state)=>state.isPlayCurrentSong);


  const [playbar, setPlaybar] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying,setIsPlaying]=useState(false);
  const [currentTime,setCurrentTime]=useState<number>(0);
  const [duration,setDuration]=useState<number>(0);

 
 
  useEffect(()=>{
    if (!song) return;

  if (!audioRef.current) {
    audioRef.current = new Audio();
  }

  const audio = audioRef.current;

  audio.pause();
  audio.currentTime = 0;

   audio.src = song.audio;
  audio.load();
  setDuration(song.duration)
  if (isPlayingCurrentSong) {
    audio.play();
    setIsPlaying(true);
    
  }

    return () => {
      audio.pause(); 
    };
  },[song,isPlayingCurrentSong])



  useEffect(()=>{
    if(!audioRef.current) return

    const audio = audioRef.current;

    const updateProgress = ()=>{
      if (audio.duration) {
      setCurrentTime((audio.currentTime / audio.duration) * 100);
    }
    }

    audio.addEventListener('timeupdate',updateProgress)

    return ()=>{
      audio.removeEventListener('timeupdate',updateProgress)
    }


  },[song])

 
  const handlePlayPause =()=>{
    if(!isPlaying){
      audioRef.current?.play();
      setIsPlaying(true);
    }else{
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }




  const handleSeek=(e:Event)=>{
    if(audioRef.current){
          audioRef.current.currentTime=Number((e.target as HTMLInputElement).value);
          setCurrentTime ( Number((e.target as HTMLInputElement).value))
    }
  }




  return (

    song ? (
      <>

        <div className="  flex  gap-2 flex-1 h-[70%]">


          <section className=" h-full flex-1/2">
            <img className="w-96 h-48 object-cover rounded-full border-none" src={song?.image} alt="Non" />

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
              <span>{((song?.duration || 0) / 60).toFixed(2)}</span>

            </div>
          </section>


        </div>

        <div className=" h-full flex  flex-col justify-around gap-3">

          {/* Progress bar */}
          <div className="flex  items-center gap-3 text-xs  text-white/60">
           <Input  max={100} defaultValue={0} value={currentTime} type="range"/>
          </div>



          {/* Controls */}
          <div className="flex items-center  justify-between">

            {/* Left menu */}
            <div className="flex items-center gap-4 text-white/70">
              <Button variant={"default"}><Shuffle /></Button>
              <Button variant={"default"}><Repeat /></Button>

            </div>

            {/* Main controls */}
            <div className="flex items-center gap-5">
              <Button variant={"default"}><ChevronFirst /></Button>
            <Button onClick={handlePlayPause}  variant={"default"}>{isPlaying ? <Pause/>:<Play/>}</Button>
              <Button variant={"default"}><ChevronLast /></Button>
            </div>

            {/* Right menu */}
            <div className="flex items-center gap-4 w-[7vw]  text-white/70">
              <Slider  defaultValue={[0]} max={100} step={1} />
              <Volume2 size={40} />

            </div>

          </div>
        </div>

      </>
    ) : (
      <h1>Empty</h1>
    )

  )
}

export default PlayBackBar