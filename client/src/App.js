import { ChakraProvider } from '@chakra-ui/react'
import HomePage from './components/HomePage';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <header className="App-header">
        </header>
        <HomePage />
      </div>
    </ChakraProvider>
  );
}

export default App;
