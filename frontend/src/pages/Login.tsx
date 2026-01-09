import { LoginForm, type FormData } from '@/components/login-form'
import { useAuthentication } from '@/store/zustand'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'


type LoginResponse = {
    userData:{
      id:number;
      name:string;
      email:string;
      playlist:[]
    };
    accessToken:string;
  }





function Login() {

  const navigate = useNavigate()
  const {setIsLoggedIn,setUserData}=useAuthentication((state)=>state)
  const url = import.meta.env.VITE_BACKEND_URL;


  

  const handleSubmit = async (formData:FormData)=>{
    try {
      const response =await axios.post(`${url}/auth/login`,formData,{withCredentials:true})
      const payload:LoginResponse = response.data;
      localStorage.setItem("access-token",payload.accessToken);
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



const handleGoogleAuth =async ()=>{
   window.location.href = `${url}/auth/googleauth`;

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

        <LoginForm handleGoogleLogin={handleGoogleAuth} handleSubmit={handleSubmit} className='border-none' />


      </div>
    </div>





  )
}

export default Login