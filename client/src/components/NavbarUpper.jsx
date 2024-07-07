import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Toolbar, IconButton, Button, InputBase, Box, Modal, Paper, Menu, MenuItem } from '@mui/material';
import LoginSignUp from './LoginSignUp';
import logo from './logo.png';
import axios from 'axios';
import { setUser, clearUser } from '../features/AuthSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { toggleTheme } from '../features/ThemeSlice';

function NavbarUpper() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const { user, isAdmin } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/api/user/profile', {
            headers: {
              'token': token,
            },
          });
          dispatch(setUser({ user: response.data, token, isAdmin: response.data.isAdmin }));
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

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: mode === 'light' ? 'white' : '#212121', borderBottom: '1px solid #e0e0e0' }}>
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
          <IconButton onClick={handleThemeChange}>
            {mode === 'light' ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </IconButton>
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
                {isAdmin ? (
                  <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                ) : (
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
