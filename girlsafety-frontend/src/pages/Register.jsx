import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", data);

      alert("Registration Successful ✅");

      navigate("/");
    } catch (error) {
      alert("Registration Failed ❌");
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

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

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}