import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: null
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogout() {
        this.setState({ loggedIn: false, username: null });
    }

    handleLogin(user) {
        this.setState({ loggedIn: true, username: user.username });
    }

    render(){
        const { loggedIn, username } = this.state;

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
                        <NavLink className="d-inline p-2 bg dark text-white" to="/players/trophies">
                            Trophies Stats
                        </NavLink>
                        <NavLink className="d-inline p-2 bg dark text-white" to="/players/ratings">
                            Ratings Stats
                        </NavLink>

                        {loggedIn ? (
                            <>
                                <NavLink className="d-inline p-2 bg-dark text-white" to={`/users/${username}`}>
                                    {username}
                                </NavLink>

                                <NavLink className="d-inline p-2 bg-dark text-white" onClick={this.handleLogout}>
                                    Logout
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="d-inline p-2 bg-dark text-white" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="d-inline p-2 bg-dark text-white" to="/register">
                                    Register
                                </NavLink>
                            </>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}