// src/config/contracts.ts

export const TRIGS_TOKEN_ADDRESS = "0xc463bB636C67642870e2e82ebAdbd29e2C10eAFa";
export const GOVERNANCE_ADDRESS = "0xA3c6E2b06B3c511d52e7682Ba0Aec234F2BA692a";

// Minimal ABI for the Faucet
export const TRIGS_TOKEN_ABI = [
  "function mintTestTokens() external"
];

// Minimal ABI for Governance (Suggesting a Market)
export const GOVERNANCE_ABI = [
  "function proposeMarket(string _marketId, string _question, string _dataSource) external payable"
];