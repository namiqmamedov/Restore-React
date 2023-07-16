import { IconButton, Switch } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link, NavLink} from 'react-router-dom'
import '../../styles/header.css'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../../store/configureStore';
import SignedInMenu from '../UI/SignedInMenu/SignedInMenu';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({darkMode,handleThemeChange} : Props) => {
  const {basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum,item) => sum + item.quantity, 0)
  
  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar>

       <div className='d-flex align-items-center'>
        <Link to={'/'} className='nav-logo'>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RE-STORE
          </Typography>
        </Link>
          <Switch checked={darkMode} onChange={handleThemeChange} />
       </div>

        <div className="mx-auto main-nav">
            <NavLink to="product" className={({ isActive }) => (isActive ? 'link-active' : '')}>
              PRODUCT
            </NavLink>
            <NavLink to="about" className={({ isActive }) => (isActive ? 'link-active' : '')}>
              ABOUT
            </NavLink>
            <NavLink to="contact" className={({ isActive }) => (isActive ? 'link-active' : '')}>
              CONTACT
            </NavLink>
         </div>

        <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr: 2}}>
          <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCartIcon/>
          </Badge>
        </IconButton>
        {user ? (
          <SignedInMenu/>
        ) : (
          <div className='d-flex gap-3'>
            <Link to={'/login'} color='white'>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                LOGIN
              </Typography>
            </Link>
            
            <Link to={'/register'} color='white'>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                REGISTER
              </Typography>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header