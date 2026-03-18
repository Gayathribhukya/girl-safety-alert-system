import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", data);

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem("token", res.data); // ✅ FIXED

    alert("Login Successful ✅");
    navigate("/dashboard");
  } catch (error) {
    alert("Invalid credentials ❌");
    console.error(error);
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p
        onClick={() => navigate("/forgot-password")}
        style={{ color: "blue", cursor: "pointer" }}
        >
        Forgot Password?
      </p>

      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}