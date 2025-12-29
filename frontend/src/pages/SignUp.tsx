
import { SignUpForm, type UserSignupData } from '@/components/signup-form'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

function SignUp() {

  const navigate = useNavigate();

  const handleSubmit =async (data:UserSignupData|null)=>{
    try {
      
      const response = await axios.post("http://localhost:3000/signup",data);
      console.log(response.data)
      navigate("/dashboard")
      toast.success("User Registered")

    } catch (error) {
      console.log(error)
      
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
        <SignUpForm className='border-none' handleSubmit = {handleSubmit} />

      </div>
    </div>
  )
}

export default SignUp