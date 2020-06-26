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
import { PaymentPage } from './Pages/PaymentPage/PaymentPage';
import { PrivateRoute } from './Componenets/PrivateRoute/PrivateRoute';

export interface IAppProps {
}

class _App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <h3>Welcome To my Whisky Shop</h3>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/products">
            <ProductsPage />
          </PrivateRoute>
          <PrivateRoute path="/cart">
            <h2>Shopping Cart</h2>
            <ShoppingCart />
          </PrivateRoute>
          <PrivateRoute path="/payment">
            <h1>Payment Page</h1>
            <PaymentPage />
          </PrivateRoute>
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