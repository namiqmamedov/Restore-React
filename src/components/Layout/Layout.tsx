import Header from '../Header/Header'
import Routers from '../../routes/Routers'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { useStoreContext } from '../../context/StoreContext';
import agent from '../../api/agent';
import Loading from '../../common/Loading/Loading';
import { getCookie } from '../../util/util';
import { useAppDispatch } from '../../store/configureStore';
import { setBasket } from '../../store/shopping-cart/basketSlice';
import { fetchCurrentUser } from '../../store/shopping-cart/accountSlice';

const Layout = () => {
  const dispatch = useAppDispatch();  
  const [loading,setLoading] = useState(true);

    useEffect(() => {
        const buyerID = getCookie('buyerID');
        dispatch(fetchCurrentUser())
        if(buyerID) {
          agent.Basket.get()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
        }
        else{
          setLoading(false)
        }
    }, [dispatch])

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
    
    if(loading) return <Loading/>

  return (
    <>
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
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