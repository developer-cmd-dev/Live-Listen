import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter} from "react-router";
import { RouterProvider } from 'react-router';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import { Toaster } from 'sonner';



const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Dashboard/>
            },
            {
                path:"login",
                element:<Login/>
            }
        ]
    }   
])




createRoot(document.getElementById('root')!).render(
    
    <RouterProvider router={router}/>
)
