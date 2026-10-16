import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import VendorRegistration from "../pages/VendorRegistration";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Customer Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Vendor */}
        <Route
          path="/vendor-registration"
          element={<VendorRegistration />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;