import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddContact() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        return;
      }

      await API.post(
        "/contacts",
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Contact Added Successfully ✅");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        alert("Unauthorized ❌ Please login again");
      } else {
        alert("Failed to add contact ❌");
      }
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>➕ Add Emergency Contact</h2>

        <input
          style={input}
          placeholder="Name"
          value={contact.name}
          onChange={(e) =>
            setContact({ ...contact, name: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="Email"
          value={contact.email}
          onChange={(e) =>
            setContact({ ...contact, email: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="Phone Number"
          value={contact.phone}
          onChange={(e) =>
            setContact({ ...contact, phone: e.target.value })
          }
        />

        <button style={button} onClick={handleSubmit}>
          Save Contact
        </button>

        <button
          style={backBtn}
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "350px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const input = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
};

const button = {
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "#6366f1",
  color: "white",
  cursor: "pointer",
};

const backBtn = {
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "#334155",
  color: "white",
  cursor: "pointer",
};