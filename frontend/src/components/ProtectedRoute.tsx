
import { useAuthentication } from '@/store/zustand'
import React, { type JSX, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

type ProtectedRouteProp = {
    children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProp) {
     const isLoggedIn = useAuthentication((state) => state.isLoggedIn)
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoggedIn) navigate("/login")
    },[])

    return (
        <>
           {children}
        </>
    )
}

export default ProtectedRoute