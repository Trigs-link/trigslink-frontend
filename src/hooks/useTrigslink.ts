import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { TrigslinkClient } from "@trigslink/sdk-core";

export function useTrigslink() {
  const [client, setClient] = useState<TrigslinkClient | null>(null);

  useEffect(() => {
    // Check if a browser wallet (like MetaMask) is injected
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const initClient = async () => {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        
        // These are your placeholders until the Sepolia deployment is done
        const vaultAddress = process.env.NEXT_PUBLIC_VAULT_ADDRESS || "0xYOUR_VAULT_ADDRESS_HERE";
        const ccAddress = process.env.NEXT_PUBLIC_CC_ADDRESS || "0xYOUR_CC_ADDRESS_HERE";
        
        setClient(new TrigslinkClient(signer, vaultAddress, ccAddress));
      };
      
      initClient().catch(console.error);
    }
  }, []);

  return client;
}