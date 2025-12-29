
import LandingNavBar from '@/components/LandingNavBar'
import { LayoutTextFlip } from '@/components/ui/layout-text-flip'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'


import { useState } from 'react'
import { Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

function Landing() {

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle 500px at 50% 100px, rgba(249,115,22,0.4), transparent)",
        }}
      />

      {/* Navbar */}
      <LandingNavBar />

      {/* Hero Section */}
      <div className="relative  z-10 min-h-screen   flex flex-col items-center justify-center text-white w-full px-4 sm:px-6">

        {/* Main Title */}
        <h1 className=" mb-10 sm:text-5xl md:text-6xl lg:text-8xl font-semibold text-center">
          Live Listen.
        </h1>

        {/* Animated Flip Text */}
        <div className="mb-10  sm:mb-10 text-center">
          <LayoutTextFlip
            text="Welcome to the "
            words={["LiveListen", "Music", "Jamming"]}
          />
        </div>

        {/* Description */}
        <div className="mb-10 sm:mb-10 max-w-xl text-center opacity-60 text-sm sm:text-base md:text-lg leading-relaxed">
          <TextGenerateEffect
            words="Stream your favorite songs and jam live with friends — perfectly synced, anytime, anywhere."
          />
        </div>

        {/* Login and Signup button */}

        <div className=" w-72  mt-10 flex items-center justify-around text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <Music />
            <span>Listen Music</span>
          </HoverBorderGradient>
          <Link to={'/signin'} className='rounded-full bg-white text-black px-5 py-2 text-sm font-bold'>Sign Up</Link>
        </div>


      </div>
    </div>

  )
}



export default Landing