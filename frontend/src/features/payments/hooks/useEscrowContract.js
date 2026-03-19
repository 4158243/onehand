export function useEscrowContract() {
  return { contract: null, deposit: () => {}, release: () => {}, refund: () => {}, loading: false };
}
