import { User as UserIcon } from 'lucide-react';
import { shortenAddress } from '../../utils/formatters';

interface UserProfileProps {
  address: string;
  name: string;
  postCount: number;
}

export function UserProfile({ address, name, postCount }: UserProfileProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-secondary">{name}</h2>
          <p className="text-gray-500 text-sm mt-1">{shortenAddress(address, 6)}</p>
          <div className="flex gap-4 mt-3">
            <div>
              <span className="font-semibold text-secondary">{postCount}</span>
              <span className="text-gray-500 ml-1">
                {postCount === 1 ? 'Post' : 'Posts'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
