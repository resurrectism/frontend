import { useEffect } from 'react';
import { UnauthorizedError } from '../api/errors';
import { useUpdateIsAuthenticated } from './user/useIsAuthenticated';
import useRedirect from './useRedirect';

const UNHANDLED_REJECTION_KEY = 'unhandledrejection';

export default function useGlobalRejectionHandler() {
  const setIsAuthenticated = useUpdateIsAuthenticated();
  const redirectTo = useRedirect();

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event.reason instanceof UnauthorizedError) {
        setIsAuthenticated(false);
        redirectTo('/login');
      }
    };

    window.addEventListener(UNHANDLED_REJECTION_KEY, handleRejection);

    return () => {
      window.removeEventListener(UNHANDLED_REJECTION_KEY, handleRejection);
    };
  }, [redirectTo, setIsAuthenticated]);
}
