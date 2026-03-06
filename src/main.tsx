import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Reown AppKit Imports
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
// 1. ONLY import sepolia
import { sepolia, type AppKitNetwork } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

// 2. ONLY provide sepolia to the networks array
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [sepolia]

const wagmiAdapter = new WagmiAdapter({ projectId, networks })

const metadata = {
  name: 'Trigslink',
  description: 'Trigslink Live Validation Lab',
  url: 'https://trigslink.com', 
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  defaultNetwork: sepolia, 
  features: { analytics: true }
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)