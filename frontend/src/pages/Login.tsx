import React from 'react'
import { GalleryVerticalEnd } from 'lucide-react'
import { LoginForm } from '@/components/login-form'
function Login() {
  return (

    <div className="min-h-screen flex items-center justify-center w-full bg-[#020617] relative">
      {/* Orange Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(249,115,22,0.4), transparent)`,
        }}
      />

  
<div className=' z-10 w-sm'>
        <LoginForm />

</div>
    </div>




  )
}

export default Login