import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import './App.scss';
import MainView from './MainView';

function App() {
  return (
    <div id="App">
      <Router>
        <Route exact path={ROUTES.HOME} component={MainView} />
      </Router>
    </div>
  )
}

export default App;
