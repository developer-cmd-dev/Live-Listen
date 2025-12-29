import React from 'react'
import { cn } from '@/lib/utils'
import { Menu, MenuItem, HoveredLink, ProductItem } from '@/components/ui/navbar-menu'
import { useState } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router'

function LandingNavBar() {

    return (
        <div
            className={cn(
                "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
                "border h-14 bg-black rounded-3xl px-5"
            )}
        >
            <div className="h-full flex items-center">

                <div className="flex items-center gap-2 min-w-[140px]">
                    <img
                        src="/Logo/Logo.png"
                        alt="LiveListen logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Center - Links */}
                <div className="flex-1 flex justify-center items-center gap-6 text-sm sm:text-base">
                    <Link to="#features" className="text-white/70 hover:text-white transition">
                        Features
                    </Link>
                    <Link to="#community" className="text-white/70 hover:text-white transition">
                        Community
                    </Link>
                    <Link to="#about" className="text-white/70 hover:text-white transition">
                        About
                    </Link>
                </div>

                {/* Right - Login */}
                <div className="min-w-[100px] flex justify-end">
                    <Link to={'/login'} className="rounded-full px-6 bg-white text-sm text-black py-2 hover:bg-orange-400 ">
                        Login
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default LandingNavBar