import React, { useDebugValue, useState, type ChangeEvent, type FormEventHandler } from 'react'
import { Dialog, DialogHeader } from './ui/dialog'
import { DialogContent, DialogTrigger,DialogTitle,DialogDescription,DialogFooter,DialogClose} from './ui/dialog'

import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAuthentication } from '@/store/zustand'
import type { CreateRoom, CreateRoomData, JoinRoomData } from '@/types/types'

interface Props{
    handleJoin:(data:JoinRoomData)=>void;
}

function JoinRoomDialog({handleJoin}:Props) {

    const userdata = useAuthentication((state)=>state.userData);

    const [data,setData]=useState<JoinRoomData>({
      roomCode:0,
      userId:userdata?.id||0,
    })

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setData((prev)=>({...prev,[name]:Number(value)}))
    }





  return (
    <Dialog>
      <form onSubmit={(e)=>{
        e.preventDefault(),
        handleJoin(data);
      }}>
        <DialogTrigger asChild>
          <Button variant={'ghost'} >Join Room</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Room</DialogTitle>

          </DialogHeader>
          <div className="grid gap-4">
           
            <div className="grid gap-3">
              <Label htmlFor="roomcode">Room Code</Label>
              <Input onChange={handleOnChange} id="roomCode" type='text'  name="roomCode" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button  onClick={(e)=>handleJoin(data)}>Join Room</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default JoinRoomDialog