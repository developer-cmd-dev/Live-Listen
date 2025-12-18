
import { Outlet } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'



function App() {

  return (
 <>

 <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
  <Toaster theme='light' position={"top-center"} closeButton={true} />
  
    <Outlet/>


 </ThemeProvider>
 </>
  )
}

export default App
