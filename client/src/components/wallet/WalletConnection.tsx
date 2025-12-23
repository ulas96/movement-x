import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';

export function WalletConnection() {
  return (
    <div className="wallet-connection">
      <WalletSelector />
    </div>
  );
}
