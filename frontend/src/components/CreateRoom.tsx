import React from 'react'

function CreateRoom() {
    return (
        <div className="col-span-1  lg:col-span-2 row-span-1  flex flex-col items-center h-145  px-3">
            <div className='w-full flex items-center justify-between h-20 '>
            <p className="relative z-10 text-center text-neutral-800 dark:text-neutral-500 text-sm">
                    Code - 4545
                    </p>
                <div className='flex items-center justify-center h-full  gap-3'>
                    <div className='w-2 h-2 rounded-full bg-green-500'></div>
                    <p className="relative z-10 text-center text-neutral-800 dark:text-neutral-500 text-md">
                    8
                    </p>
                </div>
            </div>

            <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center justify-items-center">
                {Array.from({ length: 7 }).map((_, idx) => (
                    <div key={idx} className="h-24 w-32 rounded-sm bg-neutral-700 flex items-center justify-center">
                        {/* inner content here if needed */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateRoom