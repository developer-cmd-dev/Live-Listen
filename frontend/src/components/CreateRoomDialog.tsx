import React, { useDebugValue, useState, type ChangeEvent, type FormEventHandler } from 'react'
import { Dialog, DialogHeader } from './ui/dialog'
import { DialogContent, DialogTrigger,DialogTitle,DialogDescription,DialogFooter,DialogClose} from './ui/dialog'

import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAuthentication } from '@/store/zustand'
import type { CreateRoom, CreateRoomData } from '@/types/types'

interface Props{
    handleCreate:(data:CreateRoomData)=>void;
}

function CreateRoomDialog({handleCreate}:Props) {

    const userdata = useAuthentication((state)=>state.userData);

    const [data,setData]=useState<CreateRoomData>({
        roomName:"",
        username:"",
        userLimit:1,
    })

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        console.log(name,value)
        setData((prev)=>({...prev,[name]:value}))
    }





  return (
    <Dialog>
      <form onSubmit={(e)=>{
        e.preventDefault(),
        handleCreate(data);
      }}>
        <DialogTrigger asChild>
          <Button >Create Room</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
            Set your room details below.Configure your preferences before creating the room. You can invite friends to join once your room is set up.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input onChange={handleOnChange} readOnly id="username" name="username" value={userdata?.email.slice(0,userdata.email.indexOf('@'))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Room Name</Label>
              <Input onChange={handleOnChange} id="name" type='text'  name="roomName"   />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="limit">Limit</Label>
              <Input onChange={handleOnChange} id="limit" type='number' min={1} max={10} name="userLimit" defaultValue={1} placeholder='max 10 users' />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button  onClick={(e)=>handleCreate(data)}>Create Room</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateRoomDialog