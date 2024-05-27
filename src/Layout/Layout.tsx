import Header from "../components/Header";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        {/* Render children components */}
        {children}
      </main>
      <footer className="footer">
        {/* Your footer content goes here */}
        <p>&copy; 2024 My Bookstore. All rights reserved.</p>
        {/* Add links to social media, contact info, etc. */}
      </footer>
    </div>
  );
};

export default Layout;
