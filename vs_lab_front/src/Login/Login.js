import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import { createBrowserHistory } from 'history';



export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            user: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'userprofiles/login/' + this.state.email + '/' + this.state.password)
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data }, () => {
                    // Redirect to the "users" page with the user data as a parameter if the login was successful
                    if (this.state.user) {
                        const history = createBrowserHistory();
                        history.push('/users/' + this.state.user.id);
                        window.location.reload();
                    } else {
                        alert('Login failed');
                    }
                });
            });
    }


    render() {
        const { email, password } = this.state;
        const disabled = !email || !password;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '65vh' }}>
                <h1>Welcome back!</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" value={email} onChange={this.handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={this.handleInputChange} required />
                    </Form.Group>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '8vh' }}>
                        <Button variant="primary" type="submit" disabled={disabled}>
                            Log in
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}
