export default function AnnouncementCard({ ann }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">{ann.title}</h3>
      <p className="text-gray-700 dark:text-gray-200 mb-2">{ann.body}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Posted on:{" "}
          {ann.createdAt
            ? new Date(ann.createdAt).toLocaleDateString()
            : "Date not available"}
        </p>
      </p>
    </div>
  );
}