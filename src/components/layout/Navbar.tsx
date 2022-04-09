import { Link, useLocation } from 'wouter';
import { Flex, Box, Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../../App';
import { RESET, useUpdateAtom } from 'jotai/utils';

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
  const setIsAuthenticated = useUpdateAtom(isAuthenticatedAtom);
  const [, navigate] = useLocation();

  const logout = () => {
    navigate('/login');
    setIsAuthenticated(RESET);
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
        <Button variant="ghost" mr={4} onClick={logout}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export const Navbar: React.FC = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  if (isAuthenticated) {
    return <AuthenticatedNavbar />;
  } else {
    return <UnauthenticatedNavbar />;
  }
};
