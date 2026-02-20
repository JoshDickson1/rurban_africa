import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-white mb-6">404</h1>

      <p className="text-gray-400 max-w-md mb-8">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#00521A] text-white rounded-lg hover:bg-[#006B23] transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;