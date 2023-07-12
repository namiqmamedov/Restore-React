import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import ProductDetails from '../pages/ProductDetails'
import Catalog from '../components/UI/Catalog/Catalog'
import ServerError from '../errors/ServerError'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to={'home'}/>} /> 
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/product' element={<Catalog/>} />
        <Route path='/server-error' element={<ServerError/>} />
    </Routes>
  )
}

export default Routers