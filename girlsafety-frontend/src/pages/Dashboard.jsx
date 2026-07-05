import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  // 📍 LOCATION STATE
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  // 📇 CONTACT COUNT
  const [contactCount, setContactCount] = useState(0);

  // 🧠 RISK LEVEL
  const [riskLevel, setRiskLevel] = useState("");

  const navigate = useNavigate();

  // 🧠 AI RISK DETECTION
  const detectRisk = () => {
    const hour = new Date().getHours();

    if (hour >= 22 || hour <= 5) return "HIGH";
    if (hour >= 18) return "MEDIUM";

    return "LOW";
  };

  // 🎨 RISK COLORS
  const getRiskColor = (level) => {
    if (level === "HIGH") return "#ef4444";
    if (level === "MEDIUM") return "#facc15";

    return "#22c55e";
  };

  // 🚀 LOAD DATA
  useEffect(() => {

    // 📍 GET LOCATION
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        alert("Location access denied ❌");
      }
    );

    // 🧠 SET RISK LEVEL
    setRiskLevel(detectRisk());

    // 📇 FETCH CONTACT COUNT
    const fetchContactsCount = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await API.get("/contacts/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contacts = Array.isArray(res.data)
          ? res.data
          : [];

        setContactCount(contacts.length);

      } catch (error) {
        console.error(error);
      }
    };

    fetchContactsCount();

  }, []);

  // 🚨 SEND SOS
 const sendSOS = async () => {

  console.log("SOS button clicked");

  if (!location.latitude || !location.longitude) {
    console.log("Location not ready");
    alert("Location not ready ❌");
    return;
  }

  try {

    console.log("Sending request...");

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const response = await API.post(
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

    console.log("Response:", response);

    alert("🚨 SOS Sent Successfully!");

  } catch (error) {
    console.log("ERROR:", error);
    console.log("Response:", error.response);
    alert("Failed to send SOS ❌");
  }
};
  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={container}>

      <h1 style={title}>Dashboard</h1>

      {/* 🧠 RISK LEVEL */}
      <h3 style={{ color: "#fff" }}>
        ⚠️ Risk Level:
        <span style={{ color: getRiskColor(riskLevel) }}>
          {" "}{riskLevel}
        </span>
      </h3>

      {/* 📦 CARDS */}
      <div style={cardContainer}>

        {/* 📍 LOCATION */}
        <div style={card}>
          <h3>📍 Location</h3>

          <p>
            {location.latitude
              ? "Ready ✅"
              : "Fetching..."}
          </p>
        </div>

        {/* 📇 CONTACTS */}
        <div style={card}>
          <h3>📇 Contacts</h3>

          <p>{contactCount} Saved</p>

          <button
            style={smallBtn}
            onClick={() => navigate("/manage-contacts")}
          >
            Manage
          </button>
        </div>

      </div>

      {/* 🔘 BUTTONS */}
      <div style={btnContainer}>

        <button
          style={addBtn}
          onClick={() => navigate("/add-contact")}
        >
          ➕ Add Contact
        </button>

        <button
          style={sosBtn}
          onClick={sendSOS}
        >
          🚨 Send SOS
        </button>

        <button
          style={logoutBtn}
          onClick={logout}
        >
          Logout
        </button>

      </div>

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
  marginBottom: "20px",
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const card = {
  width: "220px",
  padding: "20px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
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

const btnContainer = {
  marginTop: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  alignItems: "center",
};

const addBtn = {
  width: "50%",
  padding: "12px",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const sosBtn = {
  width: "50%",
  padding: "12px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const logoutBtn = {
  width: "50%",
  padding: "12px",
  background: "#334155",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};