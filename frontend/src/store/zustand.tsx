import {create} from 'zustand'
import { Songs } from '@/pages/Dashboard'



const useSongState = create((set)=>({
    song:{

    },
  
    setsong:()=>set((state:Songs)=>({song:state}))

}))