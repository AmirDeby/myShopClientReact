import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { NavBar } from './Componenets/NavBar/NavBar/NavBar';
import { Login } from './Pages/Login/Login';
import { ProductsPage } from './Pages/ProductsPage/ProductsPage';
import { Register } from './Pages/Register/Register';

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/home" exact>
          <div>homepage</div>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route>
          page not found
        </Route>
      </Switch>
    </div>
  );
}

export default App;
