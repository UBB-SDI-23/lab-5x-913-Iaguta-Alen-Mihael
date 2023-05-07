import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            bio: '',
            birthDate: '',
            phoneNumber: '',
            currentStep: 1,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStep1Submit = this.handleStep1Submit.bind(this);
        this.handleStep2Submit = this.handleStep2Submit.bind(this);
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleStep1Submit(event) {
        event.preventDefault();
        const {password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        this.setState({currentStep: 2});
    }

    handleStep2Submit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'userprofiles', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                bio: this.state.bio,
                birthDate: this.state.birthDate.toString(),
                phoneNumber: this.state.phoneNumber
            })
        })
            .then(res => res.json())
            .then(
                () => {
                    alert("Successfully registered!");
                    this.setState({
                        email: '',
                        password: '',
                        confirmPassword: '',
                        username: '',
                        bio: '',
                        birthDate: '',
                        phoneNumber: '',
                        currentStep: 1,
                    });
                },
                () => {
                    alert('Failed');
                }
            );
    }

    render() {
        const {currentStep} = this.state;

        let stepForm;
        if (currentStep === 1) {
            stepForm = (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '8vh' }}>
                        <h1>Hello new motherfucker</h1>
                        <Form onSubmit={this.handleStep1Submit}>
                            <Form.Group controlId="email">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="text" name="email" value={this.state.email}
                                              onChange={this.handleInputChange} required/>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password}
                                              onChange={this.handleInputChange} required/>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="confirmPassword" value={this.state.confirmPassword}
                                              onChange={this.handleInputChange} required/>
                            </Form.Group>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '8vh' }}>
                                <Button variant="primary" type="submit"
                                        disabled={!this.state.email || !this.state.password || !this.state.confirmPassword}>
                                    Continue
                                </Button>
                            </div>
                        </Form>
                    </div>
            );
        } else {
            stepForm = (
                <Form onSubmit={this.handleStep2Submit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={this.state.username}
                                      onChange={this.handleInputChange} required/>
                    </Form.Group>
                    <Form.Group controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" name="bio" value={this.state.bio}
                                      onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="birthDate">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control type="date" name="birthDate" value={this.state.birthDate}
                                      onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" name="phoneNumber" value={this.state.phoneNumber}
                                      onChange={this.handleInputChange}/>
                    </Form.Group>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '8vh' }}>
                        <Button variant="primary" type="submit" disabled={!this.state.username}>
                            Register
                        </Button>
                    </div>
                </Form>
            );
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '65vh' }}>
                {stepForm}
            </div>
        );
    }
}
