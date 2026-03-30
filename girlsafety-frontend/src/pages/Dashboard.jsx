import { useEffect, useState } from "react";

import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [contactCount, setContactCount] = useState(0);

  const navigate = useNavigate();

  // ✅ FUNCTION FIRST
  const fetchContactsCount = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/contacts/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contacts = Array.isArray(res.data) ? res.data : [];
    setContactCount(contacts.length);

  } catch (error) {
    console.error(error);
  }
};
  

  // ✅ SINGLE useEffect
  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    },
    (err) => {
      console.error(err);
      alert("Location access denied ❌");
    }
  );

  fetchContactsCount(); // ✅ no warning now
}, []);
  // 🚨 Send SOS
  const sendSOS = async () => {
    if (!location.latitude || !location.longitude) {
      alert("Location not ready ❌");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/sos/send",
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🚨 SOS Sent Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send SOS ❌");
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
  <div style={container}>
    <h1 style={title}>Dashboard</h1>

    <div style={cardContainer}>
      {/* Status Card */}
      <div style={card}>
        <div style={icon}>📍</div>
        <h3>Ready ✅</h3>
      </div>

      {/* Contacts Card */}
      <div style={card}>
        <div style={icon}>📇</div>
        <h3>{contactCount} Saved</h3>
        <button style={smallBtn} onClick={() => navigate("/manage-contacts")}>
          Manage Contacts
        </button>
      </div>
    </div>

    {/* Buttons */}
    <button style={addBtn} onClick={() => navigate("/add-contact")}>
      ➕ Add Contact
    </button>

   <button style={sosBtn} onClick={sendSOS}>
  🚨 Send SOS
</button>

    <button style={logoutBtn} onClick={logout}>
  Logout
</button>
  </div>
);
}

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
  padding: "40px",
  textAlign: "center",
};

const title = {
  color: "#fff",
  marginBottom: "40px",
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const card = {
  width: "220px",
  padding: "25px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
  transition: "0.3s",
};

const icon = {
  fontSize: "30px",
  marginBottom: "10px",
};

const smallBtn = {
  marginTop: "10px",
  padding: "8px",
  borderRadius: "8px",
  border: "none",
  background: "#6366f1",
  color: "white",
  cursor: "pointer",
};

const addBtn = {
  marginTop: "40px",
  width: "60%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

const sosBtn = {
  marginTop: "20px",
  width: "60%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg, #ef4444, #dc2626)",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

const logoutBtn = {
  marginTop: "20px",
  width: "40%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#334155",
  color: "white",
  cursor: "pointer",
};