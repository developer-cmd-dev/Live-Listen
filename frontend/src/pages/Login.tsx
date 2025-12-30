import { LoginForm, type FormData } from '@/components/login-form'
import { useAuthentication } from '@/store/zustand'
import axios, { Axios, AxiosError } from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
function Login() {

  const navigate = useNavigate()
  const {setIsLoggedIn,setUserData}=useAuthentication((state)=>state)



  const handleSubmit = async (formData:FormData)=>{

    try {
      const response =await axios.post("http://localhost:3000/login",formData,{withCredentials:true})
      setIsLoggedIn(true);
      setUserData(response.data)
      navigate("/dashboard")
      toast.success("Login Success")
    } catch (error) {
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message)
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