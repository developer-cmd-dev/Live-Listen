import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Shuffle, ChevronFirst, ChevronLast, Play, Repeat, Volume2, Palette, Currency, Pause, StepForward, NonBinary } from "lucide-react"
import { useHandleCurrentSong, useIsPlaying, useSongState } from "@/store/zustand"
import { Progress } from "./ui/progress"
import { Input } from "./ui/input"

type Props = {
  nextSong: () => void;
  previousSong: () => void;
}


function PlayBackBar({ nextSong, previousSong }: Props) {



  const song = useSongState((state) => state.song);
  const isPlayingCurrentSong = useHandleCurrentSong((state) => state.isPlayCurrentSong);


  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { isPlaying, setIsPlaying } = useIsPlaying((state) => state);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);



  // Play new song
  useEffect(() => {
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
  }, [song, isPlayingCurrentSong])


  // Getting current time of playing song
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        // const durationTime = (audio.currentTime/audio.duration)*100;
        // setCurrentTime(Number(durationTime.toFixed(3)))
        setCurrentTime(audio.currentTime)

      }
    }

    audio.addEventListener('timeupdate', updateProgress)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
    }


  }, [song])


  // Updating volume 
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume])





  const handlePlayPause = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current?.pause();
      setIsPlaying(!isPlaying);
    }
  }




  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = Number((e.target.value))
      setCurrentTime(time);
      audioRef.current.currentTime = time;
      console.log(e.target.value)
    }
  }


  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume((Number(e.target.value) / 2))

  }




  return (

    song ? (
      <>

        <div className="w-full h-full flex items-center gap-6  rounded-xl shadow-lg">
          {/* Left: Song Info */}
          <div className="flex  items-center min-w-0 flex-1 max-w-[350px]">
            <img
              className="w-16 h-16 object-cover rounded-md mr-3 shadow"
              src={song?.image}
              alt={song?.name ?? "cover"}
            />
            <div className="min-w-0 flex flex-col justify-center overflow-hidden">
              <h1 className="text-base sm:text-lg font-semibold text-white truncate">{song?.name}</h1>
              <p className="text-sm text-white/70 truncate">{song?.artist_name}</p>
              <p className="text-xs text-white/50 truncate">{song?.album_name}</p>
            </div>
          </div>

          {/* Center: Main Controls & Progress */}
          <div className="flex  flex-col h-full gap-2  justify-center items-center flex-1 min-w-0">
             {/* Progress Bar */}
             <div className="flex justify-center items-center gap-2 w-full ">
              <span className="text-xs text-white/60 tabular-nums min-w-[40px] text-right">
                {new Date(currentTime * 1000).toISOString().substr(currentTime >= 3600 ? 11 : 14, currentTime >= 3600 ? 8 : 5)}
              </span>
              <Input
                min={0}
                max={duration}
                value={currentTime}
                type="range"
                step={1}
                onChange={handleSeek}
                className="flex-1  accent-green-500 h-1  bg-white/20"
                style={{ minWidth: 64, maxWidth: 800 }}
              />
              <span className="text-xs text-white/60 tabular-nums min-w-[40px] text-left">
                {new Date(duration * 1000).toISOString().substr(duration >= 3600 ? 11 : 14, duration >= 3600 ? 8 : 5)}
              </span>
            </div>
            {/* Controls */}
            <div className="flex  items-center w justify-center gap-2">
              <Button variant={"ghost"} size="icon" className="!p-1 !rounded-full"><Shuffle size={18} className="opacity-60" /></Button>
              <Button variant={"ghost"} size="icon" className="!p-1 !rounded-full"
                onClick={previousSong}
                title="Previous"
              >
                <ChevronFirst size={24} />
              </Button>
              <Button
                onClick={handlePlayPause}
                variant={"default"}
                size="icon"
                title="Play/Pause"
                className="!p-3 !rounded-full bg-white text-black hover:bg-white/80 transition"
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </Button>
              <Button onClick={nextSong} title="Next" variant={"ghost"} size="icon" className="!p-1 !rounded-full">
                <ChevronLast size={24} />
              </Button>
              <Button variant={"ghost"} size="icon" className="!p-1 !rounded-full"><Repeat size={18} className="opacity-60" /></Button>
            </div>
           
          </div>

          {/* Right: Volume */}
          <div className="flex  items-center flex-1 max-w-[180px] justify-end">
            <Volume2 size={24} className="text-white/70 mr-2" />
            <Input
              type="range"
              onChange={handleVolume}
              value={volume}
              min={0}
              max={2}
              step={0.01}
              title="Volume"
              className="accent-green-500 h-1 w-24 bg-white/20"
            />
          </div>
        </div>

      </>
    ) : (
      <h1>Empty</h1>
    )

  )
}

export default PlayBackBar