import React from 'react';

import AppWrapper from './AppWrapper';

import { createStore } from '../context/OptionContext';

import 'antd/dist/antd.css';
// import 'bootstrap/scss/bootstrap.scss';
import './App.scss';

function App() {
  return (
    <div id="App">
		<AppWrapper />
    </div>
  )
}

export default createStore(App);
