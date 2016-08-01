import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import MenuClosed from '../components/MenuClosed';
import MenuOpen from '../components/MenuOpen';
import HamburgerClosed from '../components/HamburgerClosed';
import HamburgerOpen from '../components/HamburgerOpen';

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={HamburgerClosed}>
      <IndexRoute component={MenuClosed} />
    </Route>
    <Route path='/menu' component={HamburgerOpen}>
      <IndexRoute component={MenuOpen} />
    </Route>
  </Router>
);

export default routes;