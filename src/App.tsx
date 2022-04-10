import { Flex } from '@chakra-ui/react';

import { Navbar } from './components/layout/Navbar';
import UnauthenticatedContent from './components/layout/UnauthenticatedContent';
import AuthenticatedContent from './components/layout/AuthenticatedContent';
import useGlobalRejectionHandler from './hooks/useGlobalRejectionHandler';
import { useIsAuthenticated } from './hooks/user/useIsAuthenticated';

function App() {
  const [isAuthenticated] = useIsAuthenticated();
  useGlobalRejectionHandler();

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
