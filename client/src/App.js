import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme';
import Router from './Router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <header className="App-header">
        </header>
        <Router />
      </div>
    </ChakraProvider>
  );
}

export default App;
