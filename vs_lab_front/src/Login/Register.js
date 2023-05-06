import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

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
            showModal: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStep1Submit = this.handleStep1Submit.bind(this);
        this.handleStep2Submit = this.handleStep2Submit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.showModal !== prevState.showModal && !this.state.showModal) {
            this.setState({ currentStep: 1 });
        }
    }


    handleClose() {
        this.setState({showModal: false});
    }

    handleShow() {
        this.setState({showModal: true});
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleStep1Submit(event) {
        event.preventDefault();
        const { password, confirmPassword} = this.state;
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
                    this.handleClose();
                },
                () => {
                    alert('Failed');
                }
            );
    }

    render() {
        const { currentStep, showModal } = this.state;

        let stepForm;
        let submitButton;
        let disabled;

        if (currentStep === 1) {
            stepForm = (
                <Form onSubmit={this.handleStep1Submit}>
                    <Form.Group controlId="email">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} required />
                    </Form.Group>
                </Form>
            );

            disabled = !this.state.email || !this.state.password || !this.state.confirmPassword;

        } else {
            stepForm = (
                <Form onSubmit={this.handleStep2Submit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" name="bio" value={this.state.bio} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="birthDate">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control type="date" name="birthDate" value={this.state.birthDate} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} />
                    </Form.Group>
                </Form>
            );

            disabled = !this.state.username;
        }

        if (currentStep === 1) {
            submitButton = (
                <Button variant="primary" onClick={this.handleStep1Submit} disabled={disabled}>
                    Continue
                </Button>
            );
        } else {
            submitButton = (
                <Button variant="primary" onClick={this.handleStep2Submit} disabled={disabled}>
                    Register
                </Button>
            );
        }


        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '65vh' }}>
                    <h1>Important</h1>
                    <h6>Please note that by registering, you agree to our terms and conditions which include our privacy policy,
                        acceptable use policy, and cookie policy.</h6>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button variant="primary" onClick={this.handleShow}>
                            Register
                        </Button>
                    </div>
                </div>

                <Modal show={showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {stepForm}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        {submitButton}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
