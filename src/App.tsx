import { Box, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './theme'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Expenses from './pages/Expenses'
import Home from './pages/Home'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box display='flex' flexDirection='column' minHeight='100vh'>
          <NavBar />

          {/* Main content */}
          <Box component='main' flexGrow={1} p={2}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/expenses' element={<Expenses />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
