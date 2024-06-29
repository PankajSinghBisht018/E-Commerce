import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Toolbar, IconButton, Button, InputBase, Box, FormControlLabel, Modal, Paper, Switch, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import { toggleTheme } from '../features/ThemeSlice';
import LoginSignUp from './LoginSignUp';
import logo from './logo.png';
import axios from 'axios';
import { setUser, clearUser } from '../features/AuthSlice';

function NavbarUpper() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const { user } = useSelector((state) => state.auth); 
  const [anchorEl, setAnchorEl] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/user/profile', {
            headers: {
              'token': token
            }
          });
          dispatch(setUser({ user: response.data, token }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleLoginButtonClick = () => {
    setLoginFormOpen(true);
  };

  const handleLoginFormClose = () => {
    setLoginFormOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/'); 
  };

  const handleProfile = () => {
    navigate('/profile'); 
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  return (
    <AppBar position="static" sx={{ backgroundColor: mode === 'light' ? 'white' : 'theme.palette.grey[100]', borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar className="flex justify-between">
        <Box className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-20 w-auto md:h-24 lg:h-28" />
          </NavLink>
        </Box>
        <Box className="flex-1 flex justify-center px-4 md:px-10">
          <form className="w-full flex items-center">
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none"
            />
            <IconButton type="submit" className="bg-blue-600 text-white rounded-r px-3 py-2">
              <FontAwesomeIcon icon={faSearch} />
            </IconButton>
          </form>
        </Box>
        <Box className="flex items-center space-x-2">
          <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} checked={mode === 'dark'} onChange={handleThemeChange} />} />
          <Link to="/cart" className="hidden md:flex items-center">
            <Button endIcon={<ShoppingCartIcon />}>Cart</Button>
          </Link>
        </Box>
        <Box className="flex items-center">
          {user ? (
            <>
              <Button endIcon={<AccountCircleIcon />} onClick={handleMenuOpen}>
                {user.email}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
              </Menu>
            </>
          ) : (
            <Button endIcon={<AccountCircleIcon />} onClick={handleLoginButtonClick}>
              <span className="hidden md:inline">Sign In</span>
            </Button>
          )}
        </Box>
      </Toolbar>
      <Modal open={loginFormOpen} onClose={handleLoginFormClose}>
        <Paper className="p-4 max-w-sm mx-auto my-16">
          <LoginSignUp onClose={handleLoginFormClose} />
        </Paper>
      </Modal>
    </AppBar>
  );
}

export default NavbarUpper;
