import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { aptos } from '../../config/aptosClient';
import { FUNCTIONS } from '../../constants/contract';
import { getErrorMessage } from '../../utils/errorHandler';
import { useUser } from '../../contexts/UserContext';

export function RegistrationPrompt() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signAndSubmitTransaction } = useWallet();
  const { refetchUser } = useUser();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter a username');
      return;
    }

    try {
      setLoading(true);

      const response = await signAndSubmitTransaction({
        data: {
          function: FUNCTIONS.REGISTER,
          functionArguments: [name.trim()],
        },
      });

      await aptos.waitForTransaction({
        transactionHash: response.hash,
      });

      toast.success('Registration successful!');
      refetchUser();
      setName('');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <UserPlus className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-secondary">Welcome to Movement X</h2>
      </div>
      <p className="text-gray-600 mb-4">
        To start posting, please register with a username.
      </p>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your username"
            maxLength={50}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="btn-primary w-full"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
