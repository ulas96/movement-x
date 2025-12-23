import { Link } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';
import { shortenAddress } from '../../utils/formatters';

interface UserCardProps {
  address: string;
  name: string;
}

export function UserCard({ address, name }: UserCardProps) {
  return (
    <Link
      to={`/profile/${address}`}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <UserIcon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-secondary truncate">{name}</p>
        <p className="text-gray-500 text-sm truncate">{shortenAddress(address)}</p>
      </div>
    </Link>
  );
}
