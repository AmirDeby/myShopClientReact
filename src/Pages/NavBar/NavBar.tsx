import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';

export interface INavBarProps {
}
export default class NavBar extends React.Component<INavBarProps> {
    public render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as="span"><Link to="register">Register</Link></Nav.Link>
                    <Nav.Link as="span">Features</Nav.Link>
                    <Nav.Link as="span">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light" size="sm">Search</Button>
                </Form>
            </Navbar>
        );
    }
}
