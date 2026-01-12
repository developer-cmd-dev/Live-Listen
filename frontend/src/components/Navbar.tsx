import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { LogOut, Search } from 'lucide-react'
import { useAuthentication } from '@/store/zustand'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

function Navbar() {

    const {setUserData,setIsLoggedIn} = useAuthentication((state)=>state)
    const navigate = useNavigate();

    const handleLogout = ()=>{
        setUserData(null);
        setIsLoggedIn(false);
        localStorage.removeItem('access-token');
        navigate('/login');
        
    }
  return (
      <header className="relative w-full h-14 sm:h-16 flex items-center px-2 sm:px-4">
                {/* Logo - Left */}
                <div className="absolute left-5 sm:left-4 h-full sm:h-12 w-32 rounded-2xl  overflow-hidden flex items-center justify-center">
                    <img
                        src="/Logo/Logo.png"
                        alt="LiveListen logo"
                        className="w-full h-full"
                    />
                </div>

                {/* Search - Center */}
                <div className="mx-auto  w-full max-w-3xl flex items-center gap-2">
                    <Input
                        className="border-none w-full text-sm sm:text-base"
                        placeholder="Search Song"
                    />
                    <Button type="button" className="shrink-0" variant="secondary">
                        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                </div>
                

                <div className='w-30  h-fullflex items-center justify-center'>
                    <Button onClick={handleLogout}>Logout <LogOut/></Button>
                </div>
            </header>
  )
}

export default Navbar