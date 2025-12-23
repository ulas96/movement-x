import type { Post } from '../../types';
import { PostCard } from './PostCard';
import { Loader } from 'lucide-react';

interface PostListProps {
  posts: Post[];
  loading: boolean;
}

export function PostList({ posts, loading }: PostListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-lg">No posts yet</p>
        <p className="text-gray-400 text-sm mt-2">Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <PostCard key={`${post.author}-${post.timestamp}-${index}`} post={post} />
      ))}
    </div>
  );
}
