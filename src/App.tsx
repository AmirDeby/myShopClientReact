import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import './App.css';
import { NavBar } from './Componenets/NavBar/NavBar/NavBar';
import { Login } from './Pages/Login/Login';
import { ProductsPage } from './Pages/ProductsPage/ProductsPage';
import { Register } from './Pages/Register/Register';
import { IState } from './Redux/reducer';
import { ShoppingCart } from './Componenets/ShoppingCart/ShoppingCart';

export interface IAppProps {
}

class _App extends React.Component<IAppProps> {
  public render() {
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
          <Route path="/cart">
            <h2>Shopping Cart</h2>
           <ShoppingCart />
          </Route>
          <Route>
            page not found
        </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {

  }
}
const mapDispatchToProps = {

}
export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_App);