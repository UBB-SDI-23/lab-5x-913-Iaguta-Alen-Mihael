import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddChampionModal extends Component {

    constructor(props){
        super(props);
        this.state = { chessPlayers: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API+'chessplayers')
        .then(response => response.json())
        .then(data => {
            this.setState({ chessPlayers: data });
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'chesschampions',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                lastTrophy:event.target.lastTrophy.value,
                record:event.target.record.value,
                maxRating:event.target.maxRating.value,
                consecutiveYears:event.target.consecutiveYears.value,
                current: event.target.current.value,
                description: event.target.description.value,
                chessPlayerID:event.target.chessPlayerID.value
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
                            Add Chess Champion
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="LastTrophy">
                                        <Form.Label>Last Trophy</Form.Label>
                                        <Form.Control type="text" name="lastTrophy" required 
                                        placeholder="Last Trophy"/>
                                    </Form.Group>
                                    <Form.Group controlId="Record">
                                        <Form.Label>Record</Form.Label>
                                        <Form.Control type="text" name="record" required 
                                        placeholder="x-y-z"/>
                                    </Form.Group>
                                    <Form.Group controlId="MaxRating">
                                        <Form.Label>Max Rating</Form.Label>
                                        <Form.Control type="number" name="maxRating" required 
                                        placeholder="0-5000"/>
                                    </Form.Group>
                                    <Form.Group controlId="ConsecutiveYears">
                                        <Form.Label>Consecutive Years</Form.Label>
                                        <Form.Control type="number" name="consecutiveYears" required 
                                        placeholder="0-50"/>
                                    </Form.Group>
                                    <Form.Group controlId="Current">
                                        <Form.Label>Current</Form.Label>
                                        <Form.Control type="number" name="current" required 
                                        placeholder="0 or 1"/>
                                    </Form.Group>

                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        placeholder="Short champion description"/>
                                    </Form.Group>

                                    <Form.Group controlId="ChessPlayerID" className="d-flex flex-column">
                                        <Form.Label>Chess Players</Form.Label>
                                            <Form.Select name="chessPlayerID" required defaultValue={this.props.chplayerid}>
                                                {this.state.chessPlayers.map((player) => (
                                                    <option key={player.id} value={player.id}>{player.name}</option>
                                                ))}
                                            </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="my-3">
                                        <Button variant="primary" type="submit">
                                            Add Chess Champion
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