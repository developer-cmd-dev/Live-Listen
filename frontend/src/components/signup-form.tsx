import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Eye, EyeClosed, EyeOff } from "lucide-react"

type Props = {
  className: string;
  handleSubmit: (data: UserSignupData | null) => void;
}

export function SignUpForm({
  className,
  handleSubmit
}: Props) {


  const [data, setData] = useState<UserSignupData>({
    name: "",
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isConfirmPassword,setIsConfirmPassword]=useState(true);



  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleConfirmPassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
      const password = data.password;
      if(!password.includes(e.target.value))setIsConfirmPassword(false);
      else setIsConfirmPassword(true);
  }







  return (
    <div className={cn("flex flex-col gap-6", className)} >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back Live Listen</CardTitle>
          <CardDescription>
            Signup with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e:FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            handleSubmit(data);
          }}>
            <FieldGroup>
              <Field>

                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Signup with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with

              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="email">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Jhon Doe"
                  required
                  onChange={handleData}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  onChange={handleData}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <div className=" flex items-center justify-around">
                  <Input name="password" id="password" type={showPassword?"text":"password"} required onChange={handleData} />
                  <Button variant={"ghost"} type="button" className="ml-3 cursor-pointer" onClick={()=>setShowPassword(prev=>!prev)} >
                    {showPassword ? <EyeOff  /> : <Eye />}
                  </Button>
                </div>

              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                </div>
                <div className=" flex items-center justify-around">
                  <Input  
                  name="confirm-password" 
                  id="confirm-password" 
                  type={showPassword?"text":"password"} 
                  required 
                  style={{
                    borderColor:isConfirmPassword ? "border-input":"red",
                  }}
                  onChange={handleConfirmPassword}
                  />
 
                </div>
              </Field>
              <Field>
                <Button type="submit">Signup</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}


export interface UserSignupData {
  name: string;
  email: string;
  password: string;
}