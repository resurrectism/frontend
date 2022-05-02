import { Link } from 'wouter';
import {
  Flex,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';

import {
  useIsAuthenticated,
  useUpdateIsAuthenticated,
} from '../../hooks/user/useIsAuthenticated';
import useRedirect from '../../hooks/useRedirect';
import { Api } from '../../api';
import ThemeToggle from '../ThemeToggle';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ProfileAvatar from '../ProfileAvatar';
import { Suspense } from 'react';

const NAVBAR_HEIGHT = '3.5rem';

const UnauthenticatedNavbar: React.FC = () => {
  return (
    <Flex
      w="100vw"
      h={NAVBAR_HEIGHT}
      alignItems="center"
      justifyContent="flex-end"
      px={4}
    >
      <Box>
        <ThemeToggle />
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
      px={4}
    >
      <Box>
        <Link href="/">
          <Button variant="ghost">Home</Button>
        </Link>
      </Box>
      <Flex>
        <Box mr={2}>
          <ThemeToggle />
        </Box>
        <Menu>
          <MenuButton
            as={Button}
            variant="link"
            rightIcon={<ChevronDownIcon />}
          >
            <Suspense fallback={<Avatar size="sm" />}>
              <ProfileAvatar />
            </Suspense>
          </MenuButton>
          <MenuList>
            <Link href="/profile">
              <MenuItem>Profile</MenuItem>
            </Link>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export const Navbar: React.FC = () => {
  const [isAuthenticated] = useIsAuthenticated();

  return isAuthenticated ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />;
};
