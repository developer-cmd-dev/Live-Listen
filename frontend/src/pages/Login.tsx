import { LoginForm, type FormData } from '@/components/login-form'
import { useAuthentication } from '@/store/zustand'
import axios, { Axios, AxiosError } from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
function Login() {

  const navigate = useNavigate()
  const {setIsLoggedIn,setUserData}=useAuthentication((state)=>state)
  const url = import.meta.env.VITE_BACKEND_URL;




  const handleSubmit = async (formData:FormData)=>{
    try {
      const response =await axios.post(`${url}/auth/login`,formData,{withCredentials:true})
      setIsLoggedIn(true);
      setUserData(response.data)
      navigate("/dashboard")
      toast.success("Login Success")
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data)
      }else{
        console.log(error)
      }
    }
  }


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
        <LoginForm handleSubmit={handleSubmit} className='border-none' />

      </div>
    </div>




  )
}

export default Login