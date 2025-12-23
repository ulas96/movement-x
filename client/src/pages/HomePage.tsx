import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useUser } from '../contexts/UserContext';
import { useGlobalFeed } from '../hooks/useGlobalFeed';
import { RegistrationPrompt } from '../components/auth/RegistrationPrompt';
import { PostComposer } from '../components/post/PostComposer';
import { PostList } from '../components/post/PostList';
import { WalletIcon } from 'lucide-react';

export function HomePage() {
  const { connected } = useWallet();
  const { isRegistered, loading: userLoading, userAddress } = useUser();
  const { posts, loading: postsLoading, refetch } = useGlobalFeed(userAddress);

  if (!connected) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <WalletIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-secondary mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-gray-500">
          Please connect your wallet to view and create posts
        </p>
      </div>
    );
  }

  if (userLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-secondary">Home</h1>

      {isRegistered ? (
        <PostComposer onPostCreated={refetch} />
      ) : (
        <RegistrationPrompt />
      )}

      <div>
        <h2 className="text-lg font-semibold text-secondary mb-4">Global Feed</h2>
        <PostList posts={posts} loading={postsLoading} />
      </div>
    </div>
  );
}
