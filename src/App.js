import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import Home from '../src/pages/Home/home';
import Room from '../src/pages/Room/room';
// import Home from '@pages/Home/home.jsx';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Room />
    </ChakraProvider>
  );
}

export default App;
