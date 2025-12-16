import { create } from 'zustand'
import { type Songs } from '@/pages/Dashboard'

type SongStore={
    song:Songs|null;
    setSong:(song:Songs|undefined)=>void;
} 



const useSongState = create<SongStore>((set) =>({
   song:null,
   setSong:((song)=>set({song}))
}))

export default useSongState;