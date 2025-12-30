import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter} from "react-router";
import { RouterProvider } from 'react-router';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import { Toaster } from 'sonner';
import Landing from './pages/Landing.tsx';
import SignUp from './pages/SignUp.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';



const router = createBrowserRouter([
  
    {
        path:"/",
         element:<App/>,
        children:[
            {
                path:"/",
                element:<Landing/>
            },
            {
                path:"/dashboard",
                element:<ProtectedRoute><Dashboard/></ProtectedRoute>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/signup",
                element:<SignUp/>
            },
        ]
    }
])




createRoot(document.getElementById('root')!).render(
    
    <RouterProvider router={router}/>
)
