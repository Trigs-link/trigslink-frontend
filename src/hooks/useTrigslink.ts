import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { TrigslinkClient } from "@trigslink/sdk-core";

export function useTrigslink() {
  const [client, setClient] = useState<TrigslinkClient | null>(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        if (typeof window !== "undefined" && (window as any).ethereum) {
          // Check for v6 (BrowserProvider) vs v5 (Web3Provider) compatibility
          const provider = ethers.BrowserProvider 
            ? new ethers.BrowserProvider((window as any).ethereum)
            : new (ethers as any).providers.Web3Provider((window as any).ethereum);
            
          const signer = await provider.getSigner();
          
          const vaultAddress = process.env.NEXT_PUBLIC_VAULT_ADDRESS || "0xYOUR_VAULT_ADDRESS_HERE";
          const ccAddress = process.env.NEXT_PUBLIC_CC_ADDRESS || "0xYOUR_CC_ADDRESS_HERE";
          
          setClient(new TrigslinkClient(signer, vaultAddress, ccAddress));
        }
      } catch (err) {
        console.error("Trigslink SDK Initialization Error:", err);
      }
    };
    
    initClient();
  }, []);

  return client;
}