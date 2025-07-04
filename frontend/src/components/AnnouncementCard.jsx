export default function AnnouncementCard({ ann, user, handleDelete }) {
  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow hover:shadow-md transition relative">
      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">{ann.title}</h3>
      <div className="text-gray-700 dark:text-gray-200 mb-2">{ann.body}</div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Posted on: {new Date(ann.createdAt).toLocaleDateString()}
      </p>

      {isAdmin && (
        <button
          onClick={() => handleDelete(ann._id)}
          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
}