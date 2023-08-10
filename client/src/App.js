import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme';
import Router from './Router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
