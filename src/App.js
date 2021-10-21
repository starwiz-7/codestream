import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Home from '../src/pages/Home/home';
const Room = lazy(() => import('../src/pages/Room/room'));

function App() {
  return (
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
  );
}

export default App;
