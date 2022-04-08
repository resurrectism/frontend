import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'teal' }),
);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
