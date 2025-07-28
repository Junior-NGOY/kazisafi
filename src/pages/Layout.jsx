import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import OrderPopup from "../components/OrderPopup/OrderPopup";
import ContactModal from "../components/ContactModal";
import QuoteModal from "../components/QuoteModal";

const Layout = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [contactModal, setContactModal] = React.useState(false);
  const [quoteModal, setQuoteModal] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const handleContactClick = () => {
    setContactModal(true);
  };

  const handleQuoteClick = () => {
    setQuoteModal(true);
  };
  return (
    <>
      <Navbar 
        handleOrderPopup={handleOrderPopup} 
        handleContactClick={handleContactClick}
        handleQuoteClick={handleQuoteClick}
      />
      <Outlet />
      <Footer />
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      <ContactModal 
        isOpen={contactModal} 
        onClose={() => setContactModal(false)}
      />
      <QuoteModal 
        isOpen={quoteModal} 
        onClose={() => setQuoteModal(false)}
      />
    </>
  );
};

export default Layout;
