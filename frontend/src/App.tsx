
import { Outlet, useNavigate } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { toast, Toaster } from 'sonner'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuthentication } from './store/zustand'



function App() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData } = useAuthentication((state) => state)

  useEffect(() => {

    const handleAuthentication = async () => {

      try {
        const accessToken = localStorage.getItem("access-token");
        if (accessToken) {
          const response = await axios.post(`${url}/auth/login`, null, { headers: { Authorization: `Bearer ${accessToken}` } })
          console.log(response.data)
          setUserData(response.data)
          navigate("/dashboard")
          setIsLoggedIn(true)
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            axios.post(`${url}/auth/refresh`, null, { withCredentials: true })
              .then((response) => console.log(response.data))
              .catch((error) => {
                if (axios.isAxiosError(error)) {
                  if (error.response?.status === 401) {
                    toast.error("Your Session has expired. Login Again")
                  }
                }
              })

          }
        }
      }

    }

    handleAuthentication()

  }, [])


  return (
    <>

      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Toaster theme='light' position={"top-center"} closeButton={true} />
        <Outlet />
      </ThemeProvider>
    </>
  )
}

export default App
