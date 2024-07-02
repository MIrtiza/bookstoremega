const Footer = () => {
  const year = new Date();

  return (
    <footer className="footer">
      <p>&copy; {year.getFullYear()} My Bookstore. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
