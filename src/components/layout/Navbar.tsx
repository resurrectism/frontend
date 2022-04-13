import { Link } from 'wouter';
import { Flex, Box, Button } from '@chakra-ui/react';

import {
  useIsAuthenticated,
  useUpdateIsAuthenticated,
} from '../../hooks/user/useIsAuthenticated';
import useRedirect from '../../hooks/useRedirect';
import { Api } from '../../api';

const NAVBAR_HEIGHT = '3.5rem';

const UnauthenticatedNavbar: React.FC = () => {
  return (
    <Flex
      w="100vw"
      h={NAVBAR_HEIGHT}
      alignItems="center"
      justifyContent="flex-end"
    >
      <Box>
        <Link href="/signup">
          <Button variant="ghost" mr={4}>
            Sign Up
          </Button>
        </Link>

        <Link href="/login">
          <Button variant="ghost" mr={4}>
            Login
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

const AuthenticatedNavbar: React.FC = () => {
  const setIsAuthenticated = useUpdateIsAuthenticated();
  const redirectTo = useRedirect();

  const onLogout = () => {
    Api.usersLogout();
    redirectTo('/login');
    setIsAuthenticated(false);
  };

  return (
    <Flex
      w="100vw"
      h={NAVBAR_HEIGHT}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Link href="/">
          <Button variant="ghost" mr={4}>
            Home
          </Button>
        </Link>
      </Box>
      <Box>
        <Button variant="ghost" mr={4} onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export const Navbar: React.FC = () => {
  const [isAuthenticated] = useIsAuthenticated();

  return isAuthenticated ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />;
};
