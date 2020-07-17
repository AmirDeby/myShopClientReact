import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from '../../../Redux/reducer';
import { CartIcon } from '../../CartIcon/CartIcon';
import { Search } from '../../Search/Search';
import { LogOfButton } from '../../LogOffButton/LogOffButton';
import OrdersIcon from '../../OrdersIcon/OrdersIcon';

export interface INavBarProps {
    isLogged: boolean,
}

class _NavBar extends React.Component<INavBarProps> {

    public render() {
        const { isLogged } = this.props;
        return (
            < Navbar style={{ backgroundColor: "rgba(255, 255, 255, 0.726)" }}>
                < Navbar.Brand > WhiskyShop</Navbar.Brand >
                <Nav className="mr-auto">
                    {isLogged ? null : <Nav.Link as="span"><Link to="/register"><b>Register</b></Link></Nav.Link>}
                    {isLogged ? null : <Nav.Link as="span"><Link to="/login"><b>Login</b></Link></Nav.Link>}
                    {isLogged ? <Nav.Link as="span"><Link to="/products"><b>Products</b></Link></Nav.Link> : null}
                </Nav>
                <div style={{ margin: "auto" }}>
                    {isLogged ? <Search /> : null}
                </div>
                {isLogged ? <Nav.Link as="span"><Link to="/orders"><OrdersIcon /></Link></Nav.Link> : null}
                {isLogged ? <Nav.Link as="span"><Link to="/cart"><CartIcon /></Link></Nav.Link> : null}
                {isLogged ? < LogOfButton /> : null}
            </ Navbar>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        isLogged: state.isLogged,
    }
}
const mapDispatchToProps = {

}
export const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_NavBar);