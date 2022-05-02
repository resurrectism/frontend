import { Link } from 'wouter';
import { Box, Button } from '@chakra-ui/react';
import ThemeToggle from '../../ThemeToggle';
import NavbarContainer from './NavbarContainer';

const UnauthenticatedNavbar: React.FC = () => {
  return (
    <NavbarContainer justifyContent="flex-end">
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
    </NavbarContainer>
  );
};

export default UnauthenticatedNavbar;
