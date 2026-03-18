import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // 📍 Get location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => alert("Location access denied ❌"),
      { enableHighAccuracy: true }
    );
  }, []);

  // 👥 Get contacts count
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/contacts/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setContacts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContacts();
  }, []);

  // 🚨 SOS
 const sendSOS = async () => {
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

    alert("🚨 SOS Sent!");
  } catch (err) {
    console.error(err);
    alert("Error sending SOS ❌");
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚨 Girl Safety Dashboard</h1>

      <div style={styles.card}>
        <p>📍 Latitude: {location.latitude || "Fetching..."}</p>
        <p>📍 Longitude: {location.longitude || "Fetching..."}</p>
      </div>

      <div style={styles.card}>
        <h3>👥 Emergency Contacts</h3>
        <h1>{contacts.length}</h1>
      </div>

      <button style={styles.sosBtn} onClick={sendSOS}>
        🚨 SEND SOS
      </button>

      <button style={styles.btn} onClick={() => navigate("/add-contact")}>
        ➕ Add Contact
      </button>

      <button style={styles.logout} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    fontFamily: "Arial",
    background: "#f5f7fa",
    minHeight: "100vh",
  },
  title: {
    color: "#ff4d4d",
  },
  card: {
    background: "white",
    padding: "20px",
    margin: "20px auto",
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  sosBtn: {
    background: "red",
    color: "white",
    padding: "15px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    margin: "10px",
    cursor: "pointer",
  },
  btn: {
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  logout: {
    background: "black",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};