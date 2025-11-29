import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

function SongSearch() {
  return (
        <div className="w-full   flex items-center justify-center">
            <Input className="border-none w-[35vw]" type="text"  />
            <Button variant={"secondary"} className='ml-2'  ><Search size={90}/></Button>
          </div>
  )
}

export default SongSearch