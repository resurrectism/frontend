import { AbsoluteCenter, Flex, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';

import { Navbar } from './components/layout/navbar/Navbar';
import UnauthenticatedContent from './components/layout/UnauthenticatedContent';
import AuthenticatedContent from './components/layout/AuthenticatedContent';
import useGlobalRejectionHandler from './hooks/useGlobalRejectionHandler';
import { useIsAuthenticated } from './hooks/user/useIsAuthenticated';

function App() {
  const [isAuthenticated] = useIsAuthenticated();
  useGlobalRejectionHandler();

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
    >
      <Navbar />
      <Suspense
        fallback={
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        }
      >
        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          width="100%"
          p={10}
        >
          {isAuthenticated ? (
            <AuthenticatedContent />
          ) : (
            <UnauthenticatedContent />
          )}
        </Flex>
      </Suspense>
    </Flex>
  );
}

export default App;
