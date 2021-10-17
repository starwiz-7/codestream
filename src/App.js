import React, { lazy, Suspense } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// import Home from '@pages/Home/home.jsx';
import Home from '../src/pages/Home/home';
// import Room from '../src/pages/Room/room';
// const Home = lazy(() => import('../src/pages/Home/home'));
const Room = lazy(() => import('../src/pages/Room/room'));
function App() {
  // var socket = socketClient('http://localhost:5000');
  return (
    // <ChakraProvider theme={theme}>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
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
    // </ChakraProvider>
  );
}

export default App;
