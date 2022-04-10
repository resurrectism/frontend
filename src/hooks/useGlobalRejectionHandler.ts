import { useEffect } from 'react';
import { UnauthorizedError } from '../api';
import useLogout from './user/useLogout';

const UNHANDLED_REJECTION_KEY = 'unhandledrejection';

export default function useGlobalRejectionHandler() {
  const logout = useLogout();

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event.reason instanceof UnauthorizedError) {
        logout();
      }
    };

    window.addEventListener(UNHANDLED_REJECTION_KEY, handleRejection);

    return () => {
      window.removeEventListener(UNHANDLED_REJECTION_KEY, handleRejection);
    };
  }, [logout]);
}
