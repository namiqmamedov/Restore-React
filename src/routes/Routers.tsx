import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import ProductDetails from '../pages/ProductDetails'
import Catalog from '../components/UI/Catalog/Catalog'
import ServerError from '../errors/ServerError'
import NotFound from '../errors/NotFound'
import BasketPage from '../components/UI/Basket/BasketPage'
import Checkout from '../pages/Checkout'
import Register from '../pages/Account/Register'
import Login from '../pages/Account/Login'
import RequireAuth from './RequireAuth'
import Orders from '../pages/Orders'
import CheckoutWrapper from '../components/UI/CheckoutWrapper/CheckoutWrapper'
import Inventory from '../admin/Inventory'
import Faq from '../pages/Faq'

const Routers = () => {
  return (
    <Routes>
        <Route element={<RequireAuth/>}>
          <Route path='/checkout' element={<CheckoutWrapper/>} />
          <Route path='/orders' element={<Orders/>} />  
        </Route>
        <Route element={<RequireAuth roles={['Admin']} />}>
          <Route path='/inventory' element={<Inventory/>} />
        </Route>
        <Route path='/' element={<Navigate to={'home'}/>} /> 
        <Route path='/home' element={<Home/>} />
        {/* <Route path='/about' element={<About/>} /> */}
        <Route path='/contact' element={<Contact/>} />
        <Route path='/faq' element={<Faq/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/product' element={<Catalog/>} />
        <Route path='/server-error' element={<ServerError/>} />
        <Route path='/not-found' element={<NotFound/>} />
        <Route path='/basket' element={<BasketPage/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<Navigate replace to='/not-found' />} />
    </Routes>
  )
}

export default Routers