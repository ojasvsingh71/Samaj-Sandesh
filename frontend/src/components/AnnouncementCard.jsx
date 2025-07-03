import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function AnnouncementCard({ ann }) {
  const { user } = useContext(AuthContext);
  const date = new Date(ann.datePosted).toLocaleDateString();

  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="text-xl font-semibold">{ann.title}</h3>
      <p className="text-gray-700">{ann.body}</p>
      <p className="text-sm text-gray-500 mt-1">Posted on: {date}</p>

      {user?.role === "admin" && (
        <div className="mt-3 flex gap-3">
          <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
          <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </div>
      )}
    </div>
  );
}