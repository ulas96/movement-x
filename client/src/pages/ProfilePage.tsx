import { useParams } from 'react-router-dom';
import { useUserRegistration } from '../hooks/useUserRegistration';
import { useUserPosts } from '../hooks/useUserPosts';
import { useUser } from '../contexts/UserContext';
import { UserProfile } from '../components/user/UserProfile';
import { PostComposer } from '../components/post/PostComposer';
import { PostList } from '../components/post/PostList';
import { AlertCircle } from 'lucide-react';

export function ProfilePage() {
  const { address } = useParams<{ address: string }>();
  const { userAddress } = useUser();
  const { isRegistered, userName, loading: userLoading } = useUserRegistration(address);
  const { posts, loading: postsLoading, refetch } = useUserPosts(address);

  const isOwnProfile = address === userAddress;

  if (!address) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-secondary mb-2">Invalid Address</h2>
        <p className="text-gray-500">The profile address is invalid</p>
      </div>
    );
  }

  if (userLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-secondary mb-2">User Not Found</h2>
        <p className="text-gray-500">This user has not registered yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UserProfile address={address} name={userName} postCount={posts.length} />

      {isOwnProfile && isRegistered && (
        <div>
          <h2 className="text-lg font-semibold text-secondary mb-4">Create a Post</h2>
          <PostComposer onPostCreated={refetch} />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-secondary mb-4">
          {isOwnProfile ? 'Your Posts' : `${userName}'s Posts`}
        </h2>
        <PostList posts={posts} loading={postsLoading} />
      </div>
    </div>
  );
}
