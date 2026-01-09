import React from 'react'
import { Button } from './ui/button'
import { SendHorizonal } from 'lucide-react'
import { Input } from './ui/input'

function Chat() {
    return (
        <div className=' h-full max-w-full flex flex-col gap-2'>
            <div className='header h-15 flex  bg-neutral-800 rounded-xl'>
                <div className='h-full w-1/2 px-2 '>

                </div>

                <div className='h-full w-1/2 px-2  flex items-center justify-end gap-5'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-green-500 rounded-full h-2 w-2'></div>
                        <h1 className='text-sm font-light'>5</h1>
                    </div>

                    <Button variant={'default'} title='exit'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                    </Button>
                </div>

                
            </div>

            <div className=' h-full w-full  flex flex-col'>
                <div className='h-full w-full flex flex-col-reverse overflow-y-auto gap-2'>
                    <div className='sender  min-h-10 max-h-fit w-full flex items-center justify-end'>
                        <div className="max-w-1/2 w-full bg-[#155e75] p-3  rounded-2xl rounded-br-none" style={{ maxWidth: '50%' }}>
                           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea quam dolore ipsam et delectus maiores maxime, non 
                        </div>
                    </div>
                    
                </div>

                <div className='h-10 w-full  flex items-center gap-3 mt-4'>
                    <Input type="text" placeholder='message' className='border-none' />
                    <Button className='hover:bg-[#22d3ee] transition delay-75 ease-in-out'>
                        <SendHorizonal/>
                    </Button>
                </div>
            </div>


        </div>
    )
}

export default Chat