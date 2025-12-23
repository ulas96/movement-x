import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useUserRegistration } from '../hooks/useUserRegistration';

interface UserContextType {
  isRegistered: boolean;
  userName: string;
  userAddress: string | undefined;
  loading: boolean;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { account } = useWallet();
  const address = account?.address?.toString();
  const { isRegistered, userName, loading, refetch } = useUserRegistration(address);

  return (
    <UserContext.Provider
      value={{
        isRegistered,
        userName,
        userAddress: address,
        loading,
        refetchUser: refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
