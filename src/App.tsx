import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import NavBar from './Pages/NavBar/NavBar';
import Register from './Pages/Register/Register';

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <div>homepage</div>
        </Route>
        <Route path="/register">
          <Register />
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
