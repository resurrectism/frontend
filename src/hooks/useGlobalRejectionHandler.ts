import { useEffect } from 'react';
import { UnauthorizedError } from '../api';
import { useIsAuthenticated } from './user/useIsAuthenticated';

const UNHANDLED_REJECTION_KEY = 'unhandledrejection';

export default function useGlobalRejectionHandler() {
  const [isAuthenticated, setIsAuthenticated] = useIsAuthenticated();

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event.reason instanceof UnauthorizedError && isAuthenticated) {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener(UNHANDLED_REJECTION_KEY, handleRejection);

    return () =>
      window.removeEventListener(UNHANDLED_REJECTION_KEY, handleRejection);
  }, [isAuthenticated, setIsAuthenticated]);
}
