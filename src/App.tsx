import { AbsoluteCenter, Flex, Spinner } from '@chakra-ui/react';
import { Provider } from 'jotai';
import { Suspense } from 'react';

import { Navbar } from './components/layout/Navbar';
import UnauthenticatedContent from './components/layout/UnauthenticatedContent';
import AuthenticatedContent from './components/layout/AuthenticatedContent';
import useGlobalRejectionHandler from './hooks/useGlobalRejectionHandler';
import { useIsAuthenticated } from './hooks/user/useIsAuthenticated';

function App() {
  const [isAuthenticated] = useIsAuthenticated();
  useGlobalRejectionHandler();

  return (
    <Provider>
      <Flex
        w="100vw"
        h="100vh"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Navbar />
        <Suspense
          fallback={
            <AbsoluteCenter>
              <Spinner />
            </AbsoluteCenter>
          }
        >
          {isAuthenticated ? (
            <AuthenticatedContent />
          ) : (
            <UnauthenticatedContent />
          )}
        </Suspense>
      </Flex>
    </Provider>
  );
}

export default App;
