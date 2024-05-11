// App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import WebsiteHome from './website/pages';
import ProductDetail from './website/pages/Detail';
import Cart from './website/pages/Cart';
import Checkout from './website/pages/Checkout';
import Favorites from './website/pages/Favorites';
import NotFound from './dashboard/pages/NotFound';

// dashboard
import DashboardHome from './dashboard/pages';
import DashboardLogin from './dashboard/pages/Login';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Assuming you have a state to track login status
  
  return (
    <Router>
      <Routes>
        {/* Website Routes */}
        <Route path="/" element={<WebsiteHome />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favorites" element={<Favorites />} />
        
        {/* Protected Dashboard Route */}
        <Route path="/dashboard/*" element={<DashboardRoutes isLoggedIn={isLoggedIn} />} />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

// Define a separate component for dashboard routes
const DashboardRoutes: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  // if (!isLoggedIn) {
  //   return <Navigate to="/dashboard/login" />    ;
  // }

  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/login" element={<DashboardLogin />} />
    </Routes>
  );
};

export default App;
