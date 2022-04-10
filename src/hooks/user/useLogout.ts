import { useLocation } from 'wouter';
import { useUpdateIsAuthenticated } from './useIsAuthenticated';

export default function useLogout() {
  const setIsAuthenticated = useUpdateIsAuthenticated();
  const [, navigate] = useLocation();

  return () => {
    navigate('/login');
    setIsAuthenticated(false);
  };
}
