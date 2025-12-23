import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
      <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-secondary mb-2">404</h1>
      <h2 className="text-xl font-semibold text-secondary mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2">
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
