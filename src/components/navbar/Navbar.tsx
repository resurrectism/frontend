import { Link } from 'wouter';
import { Flex, Box, Button } from '@chakra-ui/react';

export const Navbar: React.FC = () => {
  return (
    <Flex w="100vw" h="56px" alignItems="center" justifyContent="space-between">
      <Box>
        <Link href="/">
          <Button variant="ghost" ml={4}>
            Home
          </Button>
        </Link>
      </Box>

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
