import { useAtom } from 'jotai';
import { atomWithStorage, useUpdateAtom } from 'jotai/utils';

const isAuthenticatedAtom = atomWithStorage<boolean>('isAuthenticated', false);

export function useUpdateIsAuthenticated() {
  return useUpdateAtom(isAuthenticatedAtom);
}

export function useIsAuthenticated() {
  return useAtom(isAuthenticatedAtom);
}
