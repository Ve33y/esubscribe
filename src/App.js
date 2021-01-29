import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Subscribe } from './pages/Subscribe';
import { Broadcast } from './pages/Broadcast';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/broadcast">
          <Broadcast />
        </Route>
        <Route path="/">
          <Subscribe />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;