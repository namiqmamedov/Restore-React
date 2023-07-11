import { IconButton, Switch } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link, NavLink} from 'react-router-dom'
import '../../styles/header.css'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({darkMode,handleThemeChange} : Props) => {
  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar>

       <Link to={'/'} className='nav-logo'>
       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RE-STORE
        </Typography>
       </Link>

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

        <IconButton size='large' edge='start' color='inherit' sx={{mr: 2}}>
          <Badge badgeContent='4' color="secondary">
              <ShoppingCartIcon/>
          </Badge>
        </IconButton>

        <Switch checked={darkMode} onChange={handleThemeChange} />
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  )
}

export default Header