import { useState } from "react";
import API from "../services/api";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendResetLink = async () => {

    try {

      const res = await API.post(
        "/auth/forgot-password",
        { email }
      );

      setMessage(res.data);

    } catch (error) {

      console.error(error);
      setMessage("Failed to send reset link ❌");
    }
  };

  return (

    <div style={container}>

      <div style={card}>

        <div style={icon}>🔐</div>

        <h1 style={title}>
          Forgot Password
        </h1>

        <p style={subtitle}>
          Enter your email address and we’ll send you a password reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <button
          style={button}
          onClick={sendResetLink}
        >
          Send Reset Link
        </button>

        {message && (
          <p style={messageStyle}>
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

/* STYLES */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
  padding: "20px",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  borderRadius: "24px",
  padding: "40px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.1)",
};

const icon = {
  fontSize: "50px",
  marginBottom: "10px",
};

const title = {
  color: "#fff",
  fontSize: "32px",
  marginBottom: "10px",
  fontWeight: "700",
};

const subtitle = {
  color: "#cbd5e1",
  fontSize: "14px",
  marginBottom: "30px",
  lineHeight: "1.5",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  marginBottom: "20px",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const messageStyle = {
  marginTop: "20px",
  color: "#fff",
  fontSize: "14px",
};