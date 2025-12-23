import { WalletConnection } from '../wallet/WalletConnection';

export function Header() {
  return (
    <header className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-700 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Home</h1>
        <WalletConnection />
      </div>
    </header>
  );
}
