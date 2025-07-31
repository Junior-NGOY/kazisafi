import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import NoPage from "./pages/NoPage";
import ServicesPage from "./pages/ServicesPage";
import About from "./pages/About";
import BlogsDetails from "./pages/BlogsDetails";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<BlogPage />} />
            <Route path="blogs/:id" element={<BlogsDetails />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:serviceName" element={<ServiceDetail />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          {/* Route d'administration sans layout */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
