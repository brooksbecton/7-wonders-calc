export function useIsOnline(): boolean {
  if (typeof window !== "undefined") {
      return navigator.onLine
  } else {
      return false; 
  }
}
