import { Box, ThemeProvider } from '@mui/material'
import theme from './theme'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box display='flex' flexDirection='column' minHeight='100vh'>
        <NavBar />

        {/* Main content */}
        <Box component='main' flexGrow={1} p={2}></Box>

        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
