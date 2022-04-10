import { Link } from 'wouter';
import { Flex, Box, Button } from '@chakra-ui/react';

import { useIsAuthenticated } from '../../hooks/user/useIsAuthenticated';
import useLogout from '../../hooks/user/useLogout';

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
  const logout = useLogout();

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
        <Button variant="ghost" mr={4} onClick={logout}>
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
