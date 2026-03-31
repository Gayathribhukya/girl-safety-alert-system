import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddContact from "./pages/AddContact";
import ForgotPassword from "./pages/ForgotPassword";
import ManageContacts from "./pages/ManageContacts";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import logo from "./assets/logo.png";

// 🎨 BUTTON STYLE
const navBtn = {
  margin: "10px",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#6366f1",
  color: "white",
  cursor: "pointer",
};

// 🔥 NAVBAR COMPONENT
function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={nav}>
      <h3 style={{ color: "#fff" }}>🚨 Safety App</h3>

      <div>
        <button style={navBtn} onClick={() => navigate("/")}>Home</button>
        <button style={navBtn} onClick={() => navigate("/about")}>About</button>
        <button style={navBtn} onClick={() => navigate("/contact")}>Contact</button>
      </div>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 40px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
};

// 🔥 MAIN APP
function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#0f172a" }}>
        
        {/* 🔥 LOGO + TITLE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            paddingTop: "20px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "50px",
              background: "white",
              borderRadius: "10px",
              padding: "5px",
            }}
          />
          <h2 style={{ color: "#fff" }}>
            Girl Safety Alert System
          </h2>
        </div>

        {/* 🔥 NAVBAR */}
        <Navbar />

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