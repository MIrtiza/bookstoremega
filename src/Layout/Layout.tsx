import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { ReactNode, useState } from "react";

import CartPopup from "../components/CartPopup";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const location = useLocation();

  const handleCartIconClick = () => {
    if (location.pathname === "/cart") {
      alert("You are already on the cart page.");
    } else {
      setIsCartPopupOpen(true);
    }
  };

  const handleCloseCartPopup = () => {
    setIsCartPopupOpen(false);
  };

  return (
    <div className="layout">
      <Header onCartIconClick={handleCartIconClick} />
      <main className="main">{children}</main>
      <Footer />

      {isCartPopupOpen && <CartPopup onClose={handleCloseCartPopup} />}
    </div>
  );
};

export default Layout;
