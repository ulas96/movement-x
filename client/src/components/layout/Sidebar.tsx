import { Link, useLocation } from 'react-router-dom';
import { Home, User, Twitter } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

export function Sidebar() {
  const location = useLocation();
  const { userAddress } = useUser();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-20 xl:w-64 min-h-screen p-2 xl:p-4">
      <div className="flex flex-col h-full">
        <div className="p-3 mb-4">
          <Twitter className="w-8 h-8 text-blue-500" />
        </div>

        <nav className="space-y-2 flex-1">
          <Link
            to="/"
            className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all ${
              isActive('/')
                ? 'font-bold'
                : 'hover:bg-gray-900'
            }`}
          >
            <Home className="w-7 h-7" />
            <span className="text-xl hidden xl:block">Home</span>
          </Link>

          {userAddress && (
            <Link
              to={`/profile/${userAddress}`}
              className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all ${
                isActive(`/profile/${userAddress}`)
                  ? 'font-bold'
                  : 'hover:bg-gray-900'
              }`}
            >
              <User className="w-7 h-7" />
              <span className="text-xl hidden xl:block">Profile</span>
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
}
