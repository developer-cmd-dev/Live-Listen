import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Shuffle, ChevronFirst, ChevronLast, Play, Repeat, Volume2, Palette, Currency, Pause, StepForward } from "lucide-react"
import { useHandleCurrentSong, useIsPlaying, useSongState } from "@/store/zustand"
import { Progress } from "./ui/progress"
import { Input } from "./ui/input"

type Props = {
  nextSong:()=>void;
  previousSong:()=>void;
}


function PlayBackBar({nextSong,previousSong}:Props) {



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

        <div className="  flex   gap-2 flex-1 h-[70%]">


          <section className="  h-full flex-1/2">
            <img className="w-96 h-48 object-cover rounded-xl border-none" src={song?.image} alt="Non" />



          </section>
          <section className="h-full w-[260px] min-w-0 p-4 flex flex-col justify-center gap-2 overflow-hidden">
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
            <Input
              max={duration}
              value={currentTime}
              type="range"
              onChange={handleSeek}
            />
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
              <Button
              onClick={previousSong}
                variant={"default"}
                title="previous"
              >
                <ChevronFirst />
              </Button>
              <Button
                onClick={handlePlayPause}
                variant={"default"}
                title="play/pause"
              >
                {isPlaying ? <Pause /> : <Play />}
              </Button>
              <Button onClick={nextSong} title="next" variant={"default"}><ChevronLast /></Button>
            </div>

            {/* Right menu */}
            <div className="flex items-center gap-4 w-[7vw]  text-white/70">
              <Input
                type="range"
                onChange={handleVolume}
                defaultValue={2}
                max={2}
                step={0.1}
                title="volume" />

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