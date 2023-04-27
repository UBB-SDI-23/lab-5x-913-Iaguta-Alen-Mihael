import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddTournamentModal extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            trophyError: '',
            prizeError: ''
        }
    }

    handleSubmit(event){
        event.preventDefault();

        const formData = {
            prizeMoney:event.target.prizeMoney.value,
            trophy: event.target.trophy.value
        }
        const prizeError = formData.prizeMoney && formData.prizeMoney >= 0 ? '' : 'Prize money should be greater than 0';
        const trophyError = formData.trophy && !/^[a-zA-Z ]+$/.test(formData.trophy) ? '' : 'No numbers in Trophies';
        
        if (prizeError || trophyError) {
            this.setState({ trophyError, prizeError });
            return;
        }

        fetch(process.env.REACT_APP_API+'chesstournament',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:event.target.name.value,
                numParticipants:event.target.numParticipants.value,
                host:event.target.host.value,
                prizeMoney:event.target.prizeMoney.value,
                trophy: event.target.trophy.value,
                description: event.target.description.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert("Action completed!");
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Chess Tournament
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required 
                                        placeholder="Name"/>
                                    </Form.Group>
                                    <Form.Group controlId="NumParticipants">
                                        <Form.Label>Participants</Form.Label>
                                        <Form.Control type="number" name="numParticipants" required 
                                        placeholder="Participant Number"/>
                                    </Form.Group>
                                    <Form.Group controlId="Host">
                                        <Form.Label>Host</Form.Label>
                                        <Form.Control type="text" name="host" required 
                                        placeholder="Host"/>
                                    </Form.Group>
                                    <Form.Group controlId="PrizeMoney">
                                        <Form.Label>Prize Money</Form.Label>
                                        <Form.Control type="number" name="prizeMoney" required 
                                            placeholder=">0" />
                                        {this.state.prizeError && <Form.Text className="text-danger">{this.state.prizeError}</Form.Text>}
                                    </Form.Group>
                                    <Form.Group controlId="Trophy">
                                        <Form.Label>Trophy</Form.Label>
                                        <Form.Control type="text" name="trophy" required 
                                            placeholder="Trophy" />
                                        {this.state.trophyError && <Form.Text className="text-danger">{this.state.trophyError}</Form.Text>}
                                    </Form.Group>
                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        placeholder="Short description about tournament"/>
                                    </Form.Group>

                                    <Form.Group className="my-3">
                                        <Button variant="primary" type="submit">
                                            Add Chess Tournament
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}