import Header from '../Header/Header'
import Routers from '../../routes/Routers'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';

const Layout = () => {
    const [darkMode,setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light'
    const theme = createTheme({
      palette: {
        mode: paletteType,
        background: {
          default: paletteType === 'light' ? '#eaeaea' : '#121212'
        }
      }
    })
  
    function handleThemeChange() {
      setDarkMode(!darkMode)
    }
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Header darkMode={false}
        handleThemeChange={handleThemeChange} />
        <Container>
            <Routers/>
        </Container>
    </ThemeProvider>
    </>
  )
}

export default Layout