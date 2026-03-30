import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", data);

    localStorage.setItem("token", res.data);
    alert("Login Successful ✅");
    navigate("/dashboard");

  } catch (error) {   // ✅ THIS IS CORRECT
    console.error(error);
    alert("Error ❌");
  }
};

  return (
    <div className="container">
      <div className="card">
        <h2>🔐 Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button onClick={handleLogin}>Login</button>

        <p onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}