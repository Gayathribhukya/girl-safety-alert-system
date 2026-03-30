import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddContact from "./pages/AddContact";
import ForgotPassword from "./pages/ForgotPassword";
import ManageContacts from "./pages/ManageContacts";
import ResetPassword from "./pages/ResetPassword";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/manage-contacts" element={<ManageContacts />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;