import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import './App.css';
import { NavBar } from './Componenets/NavBar/NavBar';
import { PrivateRoute } from './Componenets/PrivateRoute/PrivateRoute';
import { ShoppingCart } from './Componenets/ShoppingCart/ShoppingCart';
import { Login } from './Pages/Login/Login';
import { PaymentPage } from './Pages/PaymentPage/PaymentPage';
import { ProductsPage } from './Pages/ProductsPage/ProductsPage';
import { Register } from './Pages/Register/Register';
import { IState } from './Redux/reducer';
import { Orders } from './Pages/Orders/Orders';
import { getUserAction } from './Redux/action';
import Loader from './Componenets/Loader/Loader';
import { AddProdcut } from './Pages/AddProduct/AddProduct';

export interface IAppProps {
  getUser(): void,
  isNavLoading: boolean,
}
class _App extends React.Component<IAppProps> {
  componentDidMount() {
    const { getUser } = this.props;
    const token = localStorage.getItem('token');
    if (token) {
      getUser();
    }
  }
  public render() {
    const { isNavLoading } = this.props;
    if (isNavLoading) {
      return <Loader />
    }
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
          <PrivateRoute path="/orders">
            <h1>Orders Page</h1>
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/add">
            <h1 style={{ color: "white" }}>Add Product</h1>
            <AddProdcut />
          </PrivateRoute>
          <Route>
            <div style={{ backgroundColor: "rgba(226, 226, 226, 0.76)" }}>
              <h1><u><b>---ERROR---</b></u></h1>
              <img alt="404"
                src="https://www.artzstudio.com/wp-content/uploads/2020/05/404-error-not-found-page-lost.png" />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    isNavLoading: state.navLoader,
  }
}
const mapDispatchToProps = {
  getUser: getUserAction,
}
export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_App);