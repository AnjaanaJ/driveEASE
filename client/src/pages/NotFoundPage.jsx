import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-slate-800">404</h1>
      <p className="text-slate-500 mb-4">Page not found.</p>
      <Link to="/" className="text-cyan-600 underline">
        Go back home
      </Link>
    </div>
  );
}

export default NotFoundPage;