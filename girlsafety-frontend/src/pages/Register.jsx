import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    await API.post("/auth/register", data);

    alert("Registered Successfully ✅");
    navigate("/");

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert("User already exists ❌");
    } else {
      alert("Server error ❌");
    }
  }
};

  return (
    <div className="container">
      <div className="card">
        <h2>📝 Register</h2>

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

        <button onClick={handleRegister}>Register</button>

        <p onClick={() => navigate("/")}>Back to Login</p>
      </div>
    </div>
  );
}