import { Link } from 'react-router-dom';
import { Clock, User as UserIcon } from 'lucide-react';
import type { Post } from '../../types';
import { formatTimestamp, shortenAddress } from '../../utils/formatters';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="border-b border-gray-700 p-4 hover:bg-gray-900/50 transition-colors cursor-pointer">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={`/profile/${post.author}`}
              className="font-bold hover:underline"
            >
              {post.authorName || shortenAddress(post.author)}
            </Link>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">
              {formatTimestamp(post.timestamp)}
            </span>
          </div>
          <p className="text-white whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
}
