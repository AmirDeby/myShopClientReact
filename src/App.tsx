import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <Link to="/example1">example 1</Link>
      <Link to="/example2">example 2</Link>
      <Switch>
        <Route path="/" exact>
          <div>homepage</div>
        </Route>
        <Route path="/example1">
          <div>example1</div>
        </Route>
        <Route path="/example2">
          <div>example2</div>
        </Route>
        <Route>
          page not found
        </Route>
      </Switch>
    </div>
  );
}

export default App;
