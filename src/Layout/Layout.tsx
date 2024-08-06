import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { ReactNode, useState, useEffect } from "react";

import CartPopup from "../components/CartPopup";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isCartPopupOpen) {
      document.body.classList.add("cart-popup-open");
    } else {
      document.body.classList.remove("cart-popup-open");
    }
  }, [isCartPopupOpen]);

  const handleCartIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

      <div
        className={`cartOverlay ${isCartPopupOpen ? "open" : ""}`}
        onClick={handleCloseCartPopup}
      ></div>
      <div className={`cartPopup ${isCartPopupOpen ? "open" : "close"}`}>
        <CartPopup onClose={handleCloseCartPopup} />
      </div>
    </div>
  );
};

export default Layout;
