import { useState } from "react";
import API from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
  try {
    await API.post("/auth/forgot-password", { email });

    alert("Reset link sent 📩");
  } catch (err) {
  console.error("ERROR:", err.response?.data); // ✅ ADD THIS
  alert(err.response?.data || "Error ❌");
}
};
  return (
    <div style={styles.container}>
      <h2>🔐 Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.btn}>
        Send Reset Link
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  input: {
    padding: "10px",
    width: "250px",
    margin: "10px",
  },
  btn: {
    padding: "10px 20px",
    background: "blue",
    color: "white",
    border: "none",
  },
};