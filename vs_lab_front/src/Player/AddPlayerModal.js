import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddPlayerModal extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        fetch(process.env.REACT_APP_API+'chessplayers',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:event.target.name.value,
                country:event.target.country.value,
                rating:event.target.rating.value,
                isMaster:event.target.isMaster.value,
                startYear: event.target.startYear.value,
                description: event.target.description.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(JSON.stringify(result));
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
                            Add Chess Player
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
                                    <Form.Group controlId="Country">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" name="country" required 
                                        placeholder="Country"/>
                                    </Form.Group>
                                    <Form.Group controlId="Rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control type="number" name="rating" required 
                                        placeholder="0-5000"/>
                                    </Form.Group>
                                    <Form.Group controlId="IsMaster">
                                        <Form.Label>IsMaster</Form.Label>
                                        <Form.Control type="number" name="isMaster" required 
                                        placeholder="0 or 1"/>
                                    </Form.Group>
                                    <Form.Group controlId="PlayerStartYear">
                                        <Form.Label>StartYear</Form.Label>
                                        <Form.Control type="number" name="startYear" required 
                                        placeholder="1701-2023"/>
                                    </Form.Group>
                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        placeholder="Short description about player"/>
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Add Chess Player
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