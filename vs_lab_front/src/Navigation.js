import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/">
                        Home
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/players">
                        Chess Players
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/champions">
                        Chess Champions
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/tournaments">
                        Chess Tournaments
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/participations">
                        Chess Participations
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/trophies">
                        Trophies Stats
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/ratings">
                        Ratings Stats
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}