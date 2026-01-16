import { useRoomState } from '@/store/zustand'
import type { RoomType } from '@/types/types';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import Loading from './loading';

function CreateRoom({exitRoom}:{exitRoom:()=>void}) {
    const roomData: RoomType = useRoomState((state) => state.roomData) as RoomType;
  
    if(!roomData) return <Loading/>

    return (
        <div className="col-span-1  lg:col-span-2 row-span-1  flex flex-col items-center h-145  px-3">
            <div className='w-full flex items-center justify-around  h-15 '>
                <p className="relative z-10 text-center text-neutral-800 dark:text-neutral-500 w-36 text-sm  ">
                    Code - {roomData.roomId}
                </p>
                <div className=' flex items-center justify-center h-full w-20  gap-3'>
                    <div className='w-2 h-2 rounded-full bg-green-500'></div>
                    <p className="relative z-10 text-center text-neutral-800 dark:text-neutral-500 text-md">
                        {roomData.users?.length}
                    </p>
                </div>

                <div className=' h-full w-10 flex items-center justify-center'>
                   <Button variant={'ghost'} title='exit' onClick={exitRoom} ><LogOut/></Button>
                </div>
            </div>

            <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center justify-items-center">
                {roomData.users?.map((data) => (
                    <div key={data.userId} className="h-24 w-32 rounded-sm bg-green-700 flex items-center justify-center">
                        <h1 className='text-xl'>{data.email.charAt(0).toLocaleUpperCase()}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateRoom