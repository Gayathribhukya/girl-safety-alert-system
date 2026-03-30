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

      console.log("TOKEN:", token); // 🔥 debug

      if (!token) {
        alert("Please login first ❌");
        return;
      }

      await API.post(
        "/contacts",
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
        }
      );

      alert("Contact Added ✅");
      navigate("/contacts");

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
    <div className="container">
      <div className="card">
        <h2>➕ Add Contact</h2>

        <input
          placeholder="Name"
          value={contact.name}
          onChange={(e) =>
            setContact({ ...contact, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={contact.email}
          onChange={(e) =>
            setContact({ ...contact, email: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) =>
            setContact({ ...contact, phone: e.target.value })
          }
        />

        <button onClick={handleSubmit}>
          Save Contact
        </button>

        <p onClick={() => navigate("/dashboard")}>
          ⬅ Back
        </p>
      </div>
    </div>
  );
}