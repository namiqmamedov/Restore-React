import Header from '../Header/Header'
import Routers from '../../routes/Routers'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Loading from '../../common/Loading/Loading';
import { useAppDispatch } from '../../store/configureStore';
import { fetchBasketAsync } from '../../store/shopping-cart/basketSlice';
import { fetchCurrentUser } from '../../store/shopping-cart/accountSlice';
import { ScrollRestoration, useLocation } from 'react-router-dom';
import Home from '../../pages/Home';

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();  
  const [loading,setLoading] = useState(true);


  //  (use callback ) kullandigimizda işlevi şimdi ezberleyecek ve herhangi bir yeniden oluşturucuda değişmemesini
  // sağlayacak, bu da bağımlılığımızın ve kullanım etkimizin değişmeyeceği anlamına geliyor, bu da,
  // uygulamamızı başlattıktan sonra bunu bir daha asla aramayacağı anlamına geliyor
  
  const initApp = useCallback(async () =>  {  
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

    useEffect(() => {
      initApp().then(() => setLoading(false));
    }, [initApp])

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
    
    if(loading) return 

  return (
    <>
    <ThemeProvider theme={theme}>
      <ScrollRestoration/>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      <CssBaseline/>
        <Header darkMode={false}
        handleThemeChange={handleThemeChange} />
        {loading ? <Loading/> : location.pathname === '/home' ? <Home/> :
          <Container  sx={{mt: 4}}>
              <Routers/>
          </Container>  
        }

    </ThemeProvider>
    </>
  )
}

export default Layout