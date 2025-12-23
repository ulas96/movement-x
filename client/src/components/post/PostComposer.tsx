import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { aptos } from '../../config/aptosClient';
import { FUNCTIONS } from '../../constants/contract';
import { getErrorMessage } from '../../utils/errorHandler';

interface PostComposerProps {
  onPostCreated?: () => void;
}

export function PostComposer({ onPostCreated }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { signAndSubmitTransaction } = useWallet();

  const maxLength = 280;
  const remainingChars = maxLength - content.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Post cannot be empty');
      return;
    }

    if (content.length > maxLength) {
      toast.error(`Post is too long (max ${maxLength} characters)`);
      return;
    }

    try {
      setLoading(true);

      const response = await signAndSubmitTransaction({
        data: {
          function: FUNCTIONS.POST,
          functionArguments: [content.trim()],
        },
      });

      await aptos.waitForTransaction({
        transactionHash: response.hash,
      });

      toast.success('Post created!');
      setContent('');
      onPostCreated?.();
    } catch (error) {
      console.error('Post error:', error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="What's happening?"
          rows={3}
          maxLength={maxLength}
          disabled={loading}
        />
        <div className="flex items-center justify-between mt-3">
          <span
            className={`text-sm ${
              remainingChars < 20 ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {remainingChars} characters remaining
          </span>
          <button
            type="submit"
            disabled={loading || !content.trim() || content.length > maxLength}
            className="btn-primary flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
