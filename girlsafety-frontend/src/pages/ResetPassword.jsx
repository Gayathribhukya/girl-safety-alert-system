import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // 📩 Get email from URL
  const queryParams = new URLSearchParams(location.search);
const token = queryParams.get("token");

const handleReset = async () => {
  try {
   await axios.post(
  `http://localhost:8080/api/auth/reset-password/${token}`,
  { password }
);
    alert("Password reset successful ✅");
    navigate("/");
  } catch (error) {
    console.error(error.response?.data);
    alert("Reset failed ❌");
  }
};
  return (
    <div className="container">
      <div className="card">
        <h2>🔑 Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleReset}>
          Reset Password
        </button>
      </div>
    </div>
  );
}