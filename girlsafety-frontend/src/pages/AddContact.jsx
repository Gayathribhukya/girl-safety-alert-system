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

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/contacts",
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Contact added successfully ✅");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to add contact ❌");
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add Emergency Contact</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setContact({ ...contact, name: e.target.value })
        }
      />
      <br /><br />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setContact({ ...contact, email: e.target.value })
        }
      />
      <br /><br />

      <input
        type="text"
        placeholder="Phone"
        onChange={(e) =>
          setContact({ ...contact, phone: e.target.value })
        }
      />
      <br /><br />

      <button onClick={handleAdd}>
        ➕ Add Contact
      </button>

      <br /><br />

      <button onClick={() => navigate("/dashboard")}>
        ⬅ Back
      </button>
    </div>
  );
}