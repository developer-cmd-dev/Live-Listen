
import { ThemeProvider } from './components/theme-provider'

import Page from './components/dashboard/page'


function App() {

  return (
 <>
 <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
    <Page/>
 </ThemeProvider>
 </>
  )
}

export default App
