// src/config/contracts.ts

export const TRIGS_TOKEN_ADDRESS = "0xc463bB636C67642870e2e82ebAdbd29e2C10eAFa";
export const GOVERNANCE_ADDRESS = "0x7f344B5b55eD8d386462F8Cf9BD739c8c7ac87db";

// Minimal ABI for the Faucet
export const TRIGS_TOKEN_ABI = [
  "function mintTestTokens() external"
];

// Minimal ABI for Governance (Suggesting a Market)
export const GOVERNANCE_ABI = [
  "function proposeMarket(string _marketId, string _question, string _dataSource) external payable"
];