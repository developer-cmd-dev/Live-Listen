import React from 'react'
import { Spinner } from './ui/spinner';

function Loading() {
  return (
    <div className='absolute h-screen w-full bg-black opacity-35 flex items-center justify-center top-0'>
        <Spinner className='size-8'/>
    </div>
  )
}

export default Loading;