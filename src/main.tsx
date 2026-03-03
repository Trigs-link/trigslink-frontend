import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Reown AppKit Imports
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
// 1. IMPORT `AppKitNetwork` type here:
import { mainnet, arbitrum, sepolia, type AppKitNetwork } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

// 2. APPLY THE EXACT TYPE HERE (Removes the red squiggly lines):
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum, sepolia]

const wagmiAdapter = new WagmiAdapter({ projectId, networks })

// 3. Configure your platform metadata
const metadata = {
  name: 'Trigslink',
  description: 'Trigslink Live Validation Lab',
  url: 'https://trigslink.com', 
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 4. Create the Modal Instance
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: { analytics: true }
})

// 5. Initialize QueryClient
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