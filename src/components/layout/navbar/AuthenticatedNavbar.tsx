import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Suspense } from 'react';
import { Api } from '../../../api';
import { useUpdateIsAuthenticated } from '../../../hooks/user/useIsAuthenticated';
import useRedirect from '../../../hooks/useRedirect';
import ProfileAvatar from '../../ProfileAvatar';
import ThemeToggle from '../../ThemeToggle';
import NavbarContainer from './NavbarContainer';

const AuthenticatedNavbar: React.FC = () => {
  const setIsAuthenticated = useUpdateIsAuthenticated();
  const redirectTo = useRedirect();

  const onLogout = () => {
    Api.usersLogout();
    redirectTo('/login');
    setIsAuthenticated(false);
  };

  return (
    <NavbarContainer>
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
    </NavbarContainer>
  );
};

export default AuthenticatedNavbar;
