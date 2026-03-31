import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddContact from "./pages/AddContact";
import ForgotPassword from "./pages/ForgotPassword";
import ManageContacts from "./pages/ManageContacts";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div style={container}>
        
        {/* 🔥 APP TITLE */}
        <div style={header}>
          <h2 style={{ color: "#fff" }}>
            🚨 Girl Safety Alert System
          </h2>
        </div>

        {/* 🔥 ROUTES */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/manage-contacts" element={<ManageContacts />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
};

const header = {
  textAlign: "center",
  padding: "15px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
};