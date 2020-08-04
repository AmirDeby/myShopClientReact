import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { IState } from '../../Redux/reducer';
import { CartIcon } from '../CartIcon/CartIcon';
import { Search } from '../Search/Search';
import { LogOfButton } from '../LogOffButton/LogOffButton';
import OrdersIcon from '../OrdersIcon/OrdersIcon';
import '../NavBar/NavBar.css';
import Loader from '../Loader/Loader';
import { getUserAction } from '../../Redux/action';
import upperFirst from 'lodash.upperfirst';

const urLogo = 'https://dewey.tailorbrands.com/production/brand_version_mockup_image/353/3451337353_3bce069e-da9b-42bd-a407-aeedca75ad1a.png?cb=1596444788'

export interface INavBarProps {
    isLogged: boolean,
    userDetails: any,
    getUser(): void,
}

class _NavBar extends React.Component<INavBarProps> {
    public render() {
        const { isLogged, userDetails } = this.props;
        if (!userDetails) {
            return < Loader />
        }
        const firstName = upperFirst(userDetails.firstName);
        return (
            < Navbar className="navbar sticky-top">
                < Navbar.Brand > <img style={{ width: "200px" }} alt="logo" src={urLogo} /></Navbar.Brand >
                <Nav className="mr-auto">
                    {isLogged
                        ?
                        null
                        :
                        <NavDropdown title="Pages" id="collasible-nav-dropdown">
                            <NavDropdown.Item>{isLogged ? null : <Nav.Link as="span"><Link to="/register"><b>Register</b></Link></Nav.Link>}</NavDropdown.Item>
                            <NavDropdown.Item>{isLogged ? null : <Nav.Link as="span"><Link to="/login"><b>Login</b></Link></Nav.Link>}</NavDropdown.Item>
                        </NavDropdown>
                    }
                    {isLogged ? <Nav.Link as="span"><Link to="/products"><b>Products</b></Link></Nav.Link> : null}
                    {userDetails.isAdmin ? <Nav.Link as="span"><Link to="/add"><b>add Product</b></Link></Nav.Link> : null}
                </Nav>
                <div>
                    <Route path="/products">
                        {isLogged ? <Search /> : null}
                    </Route>
                </div>
                {isLogged ? <span style={{ marginRight: "25px", color: "black", fontSize: "25px" }}><b>{userDetails ? `Hello ${firstName}` : ""}</b></span> : null}
                {isLogged ? <Nav.Link as="span"><Link to="/orders"><OrdersIcon /></Link></Nav.Link> : null}
                {isLogged ? <Nav.Link as="span"><Link to="/cart"><CartIcon /></Link></Nav.Link> : null}
                {isLogged ? < LogOfButton /> : null}
            </ Navbar>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        userDetails: state.user,
        isLogged: state.isLogged,
    }
}
const mapDispatchToProps = {
    getUser: getUserAction,
}
export const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_NavBar);