import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Box, useColorModeValue, Spinner, Center } from '@chakra-ui/react';
import { COLORS } from './colors';
import Home from '../src/pages/Home/home';
const Room = lazy(() => import('../src/pages/Room/room'));

const Loader = () => {
  return (
    <Center width="100%" height="100vh">
      <Box
        px={8}
        py={5}
        mx="auto"
        pb={20}
        backgroundColor={useColorModeValue(COLORS.white, COLORS.dark)}
      >
        <Spinner
          size="xl"
          color={useColorModeValue(COLORS.dark, COLORS.white)}
        />
      </Box>
    </Center>
  );
};
function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            exact
            path="/room/:slug"
            render={props => <Room {...props} />}
          />
          <Route path="/" component={Home} />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
