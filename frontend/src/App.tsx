
import { Outlet } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { toast, Toaster } from 'sonner'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { useAuthentication } from './store/zustand'
import axios from 'axios'



function App() {

  const { userData, isLoggedIn, setIsLoggedIn, setUserData } = useAuthentication((state) => state);

  useEffect(() => {
    const basicAuthentication = async () => {
      const token = sessionStorage.getItem('Access-Token');


      try {
        if (token) {
          const response = await axios.post("http://localhost:3000/login", null, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data)
          setIsLoggedIn(true);
          setUserData(response.data);
        } 
      } catch (error) {
        toast.error("Invalid Token");
      }
    }

    basicAuthentication()

  }, [])

  return (
    <>

      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Toaster theme='light' position={"top-center"} closeButton={true} />
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </>
  )
}

export default App
