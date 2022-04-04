import { Route } from 'wouter';
import { Flex } from '@chakra-ui/react';

import { Navbar } from './components/navbar/Navbar';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/signup/SignUpPage';

function App() {
  return (
    <div>
      <Flex
        color="blue"
        w="100vw"
        h="100vh"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Navbar />
        <Route path="/" component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
      </Flex>
    </div>
  );
}

export default App;
