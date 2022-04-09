import { Flex } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Navbar } from './components/layout/Navbar';
import UnauthenticatedContent from './components/layout/UnauthenticatedContent';
import AuthenticatedContent from './components/layout/AuthenticatedContent';

export const isAuthenticatedAtom = atomWithStorage<boolean>(
  'isAuthenticated',
  false,
);

function App() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <div>
      <Flex
        w="100vw"
        h="100vh"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Navbar />
        {isAuthenticated ? (
          <AuthenticatedContent />
        ) : (
          <UnauthenticatedContent />
        )}
      </Flex>
    </div>
  );
}

export default App;
