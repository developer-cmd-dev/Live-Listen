import { create } from 'zustand'
import { type Songs } from '@/pages/Dashboard'

type SongStore={
    song:Songs|null;
    setSong:(song:Songs|undefined)=>void;
} 

type CurrentSong = {
    isPlayCurrentSong:boolean;
    setIsPlayCurrentSong:(value:boolean)=>void;

}



const useSongState = create<SongStore>((set) =>({
   song:null,
   setSong:((song)=>set({song})),
   
}))

const useHandleCurrentSong = create<CurrentSong>((set)=>({
    isPlayCurrentSong:false,
    setIsPlayCurrentSong:((value:boolean)=>set({isPlayCurrentSong:value}))
}))


export { useSongState,useHandleCurrentSong};