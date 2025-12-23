import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

// Configure for Movement testnet
const config = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: 'https://testnet.movementnetwork.xyz/v1',
});

export const aptos = new Aptos(config);
