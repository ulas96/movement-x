import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './contexts/UserContext';
import './index.css';
import App from './App.tsx';

const wallets = [new PetraWallet()];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* @ts-expect-error - plugins prop exists but type definition is outdated */}
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true} dappConfig={{ network: Network.TESTNET }}>
      <UserProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </UserProvider>
    </AptosWalletAdapterProvider>
  </StrictMode>
);
