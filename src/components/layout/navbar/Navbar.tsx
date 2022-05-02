import { useIsAuthenticated } from '../../../hooks/user/useIsAuthenticated';
import AuthenticatedNavbar from './AuthenticatedNavbar';
import UnauthenticatedNavbar from './UnauthenticatedNavbar';

export const Navbar: React.FC = () => {
  const [isAuthenticated] = useIsAuthenticated();

  return isAuthenticated ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />;
};
