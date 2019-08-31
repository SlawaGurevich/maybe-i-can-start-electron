import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import MainView from './MainView';
import OptionsView from './OptionsView';

import 'bootstrap/scss/bootstrap.scss';
import './App.scss';

function App() {
  return (
    <div id="App">
      <Router>
        <Route exact path={ROUTES.HOME} component={MainView} />
        <Route path={ROUTES.OPTIONS} component={OptionsView} />
      </Router>
    </div>
  )
}

export default App;
