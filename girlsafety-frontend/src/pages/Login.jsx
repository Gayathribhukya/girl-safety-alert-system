import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
  setLoading(true);
  setError(""); // clear old error

  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data);

    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    setError(err.response?.data || "Login failed ❌");
  } finally {
    setLoading(false);
  }
};
  return (
  <div style={mainContainer}>

    {/* 🔥 LEFT SIDE MENU */}
    <div style={leftPanel}>
      <h2 style={{ color: "#fff" }}>🚨 Safety App</h2>

      <button style={menuBtn} onClick={() => navigate("/")}>Home</button>
      <button style={menuBtn} onClick={() => navigate("/about")}>About</button>
      <button style={menuBtn} onClick={() => navigate("/contact")}>Contact</button>
    </div>

    {/* 🔥 RIGHT SIDE LOGIN */}
    <div style={rightPanel}>
      <div style={card}>
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>
          🔐 Welcome Back
        </h2>

        <input
          style={input}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={btn} onClick={login} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        {error && (
          <p style={{ color: "#f87171", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <p style={link} onClick={() => navigate("/register")}>
          Create Account
        </p>

        <p style={link} onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>
      </div>
    </div>
  </div>
);
}

/* 🎨 STYLES */


const card = {
  width: "320px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "none",
  outline: "none",
};

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

const link = {
  color: "#c7d2fe",
  cursor: "pointer",
  marginTop: "10px",
};
const mainContainer = {
  display: "flex",
  minHeight: "100vh",
};

const leftPanel = {
  width: "30%",
  background: "linear-gradient(180deg, #1e293b, #0f172a)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};

const rightPanel = {
  width: "70%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
};

const menuBtn = {
  width: "150px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "white",
  cursor: "pointer",
  transition: "0.3s",
};