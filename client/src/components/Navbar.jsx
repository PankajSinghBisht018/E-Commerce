import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavbarUpper from './NavbarUpper';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar,Toolbar,IconButton,Box,Drawer,List,ListItem,ListItemText,Hidden,} from '@mui/material';

function Navbar({ Link1, Link2, Link3, Link4, Link5 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <NavbarUpper />
      
      <Hidden smDown>
        <nav className=" font-bold text-lg relative">
          <div className="justify-center mx-auto max-w-screen-xl p-4">
            <div className="hidden sm:flex flex-col md:flex-row md:justify-center">
              <ul className="flex sm:space-x-5 lg:space-x-16 ">
                <li className="">
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      `block py-2 ${isActive ? 'text-rose-500 ' : ''} relative hover:text-rose-500 hover:after:bg-rose-500 hover:after:h-0.5 hover:after:block hover:after:content:'' hover:after:absolute hover:after:w-full hover:after:bottom-0`
                    }
                  >
                    {Link1}
                  </NavLink>
                </li>
                <li className="mb-4 sm:mb-0">
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      `block py-2 ${isActive ? 'text-rose-500 ' : ''} relative hover:text-rose-500 hover:after:bg-rose-500 hover:after:h-0.5 hover:after:block hover:after:content:'' hover:after:absolute hover:after:w-full hover:after:bottom-0`
                    }
                  >
                    {Link2}
                  </NavLink>
                </li>
                <li className="mb-4 sm:mb-0">
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      `block py-2 ${isActive ? 'text-rose-500 ' : ''} relative hover:text-rose-500 hover:after:bg-rose-500 hover:after:h-0.5 hover:after:block hover:after:content:'' hover:after:absolute hover:after:w-full hover:after:bottom-0`
                    }
                  >
                    {Link3}
                  </NavLink>
                </li>
                <li className="mb-4 sm:mb-0">
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block py-2 ${isActive ? 'text-rose-500 ' : ''} relative hover:text-rose-500 hover:after:bg-rose-500 hover:after:h-0.5 hover:after:block hover:after:content:'' hover:after:absolute hover:after:w-full hover:after:bottom-0`
                    }
                  >
                    {Link4}
                  </NavLink>
                </li>
                <li className="mb-4 sm:mb-0">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block py-2 ${isActive ? 'text-rose-500 ' : ''} relative hover:text-rose-500 hover:after:bg-rose-500 hover:after:h-0.5 hover:after:block hover:after:content:'' hover:after:absolute hover:after:w-full hover:after:bottom-0`
                    }
                  >
                    {Link5}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Hidden>
      <Hidden mdUp lgUp smUp>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMenu}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={menuOpen}
          onClose={toggleMenu}
          sx={{
            '& .MuiDrawer-paper': {
              width: 300, 
            },
          }}
        >
          <List>
            <ListItem
            
              component={NavLink}
              to="/"
              onClick={toggleMenu}
            >
              <ListItemText primary={Link1} />
            </ListItem>
            <ListItem
             
              component={NavLink}
              to="/products"
              onClick={toggleMenu}
            >
              <ListItemText primary={Link2} />
            </ListItem>
            <ListItem
          
              component={NavLink}
              to="/categories"
              onClick={toggleMenu}
            >
              <ListItemText primary={Link3} />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/about"
              onClick={toggleMenu}
            >
              <ListItemText primary={Link4} />
            </ListItem>
            <ListItem
        
              component={NavLink}
              to="/contact"
              onClick={toggleMenu}
            >
              <ListItemText primary={Link5} />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Navbar;
