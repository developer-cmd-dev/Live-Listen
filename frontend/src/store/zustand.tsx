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

type IsPlaying = {
    isPlaying :boolean;
    setIsPlaying: (value:boolean)=>void;
}

type UserData = {
    id:number;
    name:string;
    email:string;
}


interface Authentication {
    userData:UserData|null;
    isLoggedIn:boolean;
    setUserData:(data:UserData)=>void;
    setIsLoggedIn:(data:boolean)=>void;
}



const useSongState = create<SongStore>((set) =>({
   song:null,
   setSong:((song)=>set({song})),
   
}))

const useHandleCurrentSong = create<CurrentSong>((set)=>({
    isPlayCurrentSong:false,
    setIsPlayCurrentSong:((value:boolean)=>set({isPlayCurrentSong:value}))
}))


const useIsPlaying = create<IsPlaying>((set)=>({
    isPlaying:false,
    setIsPlaying:((value:boolean)=>set({isPlaying:value}))
}))


const useAuthentication= create<Authentication>((set)=>({
    userData:null,
    isLoggedIn:false,
    setUserData:(data:UserData)=>set({userData:data}),
    setIsLoggedIn:(data:boolean)=>set({isLoggedIn:data})
}))




export { useSongState,useHandleCurrentSong,useIsPlaying,useAuthentication};