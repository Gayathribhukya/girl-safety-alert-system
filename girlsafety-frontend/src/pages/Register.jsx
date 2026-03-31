import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");   // optional if you have name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully ✅");
      navigate("/");

    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>
          📝 Create Account
        </h2>

        {/* OPTIONAL NAME FIELD */}
        <input
          style={input}
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button style={btn} onClick={register} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* 🔴 ERROR MESSAGE */}
        {error && (
          <p style={{ color: "#f87171", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <p style={link} onClick={() => navigate("/")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

/* 🎨 SAME STYLES AS LOGIN */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

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