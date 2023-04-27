import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class UpdateTournamentModal extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'chesstournament/'+event.target.id.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:event.target.id.value,
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
            alert(JSON.stringify(result));
        })
        .catch((error) => {
            console.error('Error:', error);
          });
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
                            Update Chess Tournament
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={8}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ID" hidden>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control type="text" name="id" required
                                        disabled
                                        defaultValue={this.props.trid} 
                                        placeholder="ID"/>
                                    </Form.Group>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required 
                                            defaultValue={this.props.trname}
                                        placeholder="Name"/>
                                    </Form.Group>
                                    <Form.Group controlId="NumParticipants">
                                        <Form.Label>Participants</Form.Label>
                                        <Form.Control type="number" name="numParticipants" required 
                                            defaultValue={this.props.trnumparticipants}
                                        placeholder="Participant Number"/>
                                    </Form.Group>
                                    <Form.Group controlId="Host">
                                        <Form.Label>Host</Form.Label>
                                        <Form.Control type="text" name="host" required 
                                            defaultValue={this.props.trhost}
                                        placeholder="Host"/>
                                    </Form.Group>
                                    <Form.Group controlId="PrizeMoney">
                                        <Form.Label>Prize Money</Form.Label>
                                        <Form.Control type="number" name="prizeMoney" required 
                                            defaultValue={this.props.trprizemoney}
                                        placeholder=">0"/>
                                    </Form.Group>
                                    <Form.Group controlId="Trophy">
                                        <Form.Label>Trophy</Form.Label>
                                        <Form.Control type="text" name="trophy" required 
                                            defaultValue={this.props.trtrophy}
                                        placeholder="Trophy"/>
                                    </Form.Group>
                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                            defaultValue={this.props.trdescription}
                                        placeholder="Description"/>
                                    </Form.Group>

                                    <Form.Group className="my-3">
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Update Chess Tournament
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