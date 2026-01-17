
import { Outlet, useNavigate } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { toast, Toaster } from 'sonner'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthentication } from './store/zustand'
import Loading from './components/loading'
import { GoogleOAuthProvider } from '@react-oauth/google'



function App() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData } = useAuthentication((state) => state)
  const [loading, setIsLoading] = useState(false);
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


  useEffect(() => {

    const handleAuthentication = async () => {

      try {
        const accessToken = localStorage.getItem("access-token");
        if (accessToken) {
          loginUsingAccessToken(accessToken);
        }else{
          return
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setIsLoading(true);
            axios.post(`${url}/auth/refresh`, null, { withCredentials: true })
              .then((response) => {
                loginUsingAccessToken(response.data);
              })
              .catch((error) => {
                if (axios.isAxiosError(error)) {
                  if (error.response?.status === 401) {
                    toast.error("Your Session has expired. Login Again")
                    navigate('/login')
                  }
                }
              })

          }
        }
      }

    }

    handleAuthentication()

  }, [])


  const loginUsingAccessToken = async (accessToken: string) => {
    setIsLoading(true)

    const response = await axios.post(`${url}/auth/login`, null, { headers: { Authorization: `Bearer ${accessToken}` } })
    setUserData(response.data)
    setIsLoading(false)
    navigate("/dashboard")
    setIsLoggedIn(true)
  }


  return (
    <>

      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Toaster theme='light' position={"top-center"} closeButton={true} />
        <GoogleOAuthProvider clientId={googleClientId}>
        {loading ? <Loading/>:<Outlet />}

        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
