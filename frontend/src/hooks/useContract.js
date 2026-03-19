/**
 * Shared hook: generic contract instance (ethers) by address + ABI.
 */
export function useContract(address, abi) {
  // TODO: ethers Contract with signer from useWallet
  return { contract: null, loading: false, error: null };
}
