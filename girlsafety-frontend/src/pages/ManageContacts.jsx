import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // 📥 Fetch contacts
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login ❌");
        return;
      }

      const res = await API.get("/contacts/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Contacts:", res.data);

      setContacts(Array.isArray(res.data) ? res.data : []);

    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        alert("Unauthorized ❌");
      } else {
        alert("Failed to load contacts ❌");
      }
    }
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchContacts();
}, []);

  // ❌ Delete contact
  const deleteContact = async (id) => {
    try {
      const token = localStorage.getItem("token");

await API.delete(`/contacts/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      alert("Deleted ✅");

      fetchContacts(); // refresh

    } catch (error) {
      console.error(error);
      alert("Delete failed ❌");
    }
  };

  return (
  <div style={container}>
    <h2 style={title}>📇 Manage Contacts</h2>

    {contacts.length === 0 ? (
      <p style={empty}>No contacts found ❌</p>
    ) : (
      <div style={grid}>
        {contacts.map((c) => (
          <div key={c.id} style={card}>
            <h3 style={name}>{c.name}</h3>

            <p style={text}>
              📧 {c.email}
            </p>

            <p style={text}>
              📞 {c.phone}
            </p>

            <button
              style={deleteBtn}
              onClick={() => deleteContact(c.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )}

    <button style={backBtn} onClick={() => navigate("/dashboard")}>
      ⬅ Back
    </button>
  </div>
);
}

/* 🎨 STYLES */

const container = {
  padding: "40px",
  background: "linear-gradient(to right, #0f172a, #1e293b)",
  minHeight: "100vh",
};

const title = {
  textAlign: "center",
  color: "#fff",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  transition: "0.3s",
};

const name = {
  marginBottom: "10px",
  color: "#1e293b",
};

const text = {
  margin: "5px 0",
  color: "#475569",
};

const deleteBtn = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const backBtn = {
  marginTop: "30px",
  padding: "10px 20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const empty = {
  textAlign: "center",
  color: "#fff",
};