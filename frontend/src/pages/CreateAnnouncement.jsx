import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/announcement", { title, body, expiresAt });
      navigate("/announcements");
    } catch (err) {
      alert("Failed to create announcement");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-10 border rounded">
      <h2 className="text-xl font-bold mb-4">Create Announcement</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="border p-2"
        />
        <input
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-green-600 text-white py-2">
          Submit
        </button>
      </form>
    </div>
  );
}