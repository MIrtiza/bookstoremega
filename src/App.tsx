// App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Index";
import ProductDetail from "./pages/Detail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// dashboard
// import DashboardHome from './dashboard/pages';
// import DashboardLogin from './dashboard/pages/Login';

const App: React.FC = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Assuming you have a state to track login status

  return (
    <Router>
      <Routes>
        {/* Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* Protected Dashboard Route */}
        {/* <Route path="/dashboard/*" element={<DashboardRoutes />} /> */}

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

// Define a separate component for dashboard routes
// const DashboardRoutes: React.FC = () => {
// console.log(isLoggedIn)
// if (!isLoggedIn) {
//   return <Navigate to="/dashboard/login" />    ;
// }

//   return (
//     <Routes>
//       <Route path="/" element={<DashboardHome />} />
//       <Route path="/login" element={<DashboardLogin />} />
//     </Routes>
//   );
// };

export default App;
