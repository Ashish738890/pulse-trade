import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, polygon, arbitrum, optimism } from 'wagmi/chains';

// Define Monad testnet (placeholder - update when mainnet launches)
const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com' },
  },
  testnet: true,
} as const;

export const config = getDefaultConfig({
  appName: 'MonadPulse',
  projectId: 'demo-project-id', // Replace with your WalletConnect project ID
  chains: [monadTestnet, mainnet, sepolia, polygon, arbitrum, optimism],
  ssr: false,
});
