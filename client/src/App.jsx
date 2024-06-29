import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './components/theme';
import Navbar from './components/Navbar';
import Products from './Pages/Products/Products';
import Categories from './Pages/Categories/Categories';
import Contact from './Pages/Contact/Contact';
import Home from './Pages/Home/Home';
import Footer from './components/Footer';
import Cart from './Pages/Cart/Cart';
import About from './Pages/About/About';
import Profile from './components/Profile';

function AppContent() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <meta charSet="utf-8" />
        <title>SnapMart</title>
        <meta name="description" content="Sale for Everyone" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Helmet>
      <Navbar
        Link1="Home"
        Link2="Products"
        Link3="Categories"
        Link4="About"
        Link5="Contact"
      />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
