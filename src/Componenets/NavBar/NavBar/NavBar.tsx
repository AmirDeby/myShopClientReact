import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../Redux/reducer';
import { CartIcon } from '../../CartIcon/CartIcon';

export interface INavBarProps {
    isLogged: boolean,
}

class _NavBar extends React.Component<INavBarProps> {
    public render() {
        const { isLogged } = this.props;
        return (
            <Navbar style={{ backgroundColor: "rgba(255, 235, 205, 0.651)" }}>
                <Navbar.Brand>WhiskyShop</Navbar.Brand>
                <Nav className="mr-auto">
                    {isLogged ? null : <Nav.Link as="span"><Link to="/register">Register</Link></Nav.Link>}
                    {isLogged ? null : <Nav.Link as="span"><Link to="/login">Login</Link></Nav.Link>}
                    {isLogged ? <Nav.Link as="span"><Link to="/products">Products</Link></Nav.Link> : null}
                </Nav>
                <Form inline>
                    {isLogged ? <Nav.Link as="span"><Link to="/cart"><CartIcon /></Link></Nav.Link> : null}
                    <FormControl style={{ marginLeft: "17px" }} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" size="sm">Search</Button>
                </Form>
            </Navbar>
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