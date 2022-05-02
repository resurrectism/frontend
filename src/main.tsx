import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ChakraProvider,
  extendTheme,
  ThemeComponentProps,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import { Provider } from 'jotai';

const customTheme = extendTheme(
  {
    components: {
      Container: {
        baseStyle: (props: ThemeComponentProps) => ({
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          borderRadius: 'md',
        }),
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'purple' }),
);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
