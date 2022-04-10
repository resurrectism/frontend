import useRedirect from '../useRedirect';
import { useUpdateIsAuthenticated } from './useIsAuthenticated';

export default function useLogout() {
  const setIsAuthenticated = useUpdateIsAuthenticated();
  const redirectTo = useRedirect();

  return () => {
    redirectTo('/login');
    setIsAuthenticated(false);
  };
}
