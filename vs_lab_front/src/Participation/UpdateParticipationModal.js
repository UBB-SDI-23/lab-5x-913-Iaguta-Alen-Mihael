import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class UpdateParticipationModal extends Component {

    constructor(props){
        super(props);
        this.state = { chessPlayers: [], chessTournament: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API+'chessplayers')
        .then(response => response.json())
        .then(data => {
            this.setState({ chessPlayers: data.data });
        });

        fetch(process.env.REACT_APP_API+'chesstournament')
        .then(response => response.json())
        .then(data => {
            this.setState({ chessTournament: data.data });
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'chessplayers/' + event.target.chessPlayerID.value + '/participations/' + event.target.chessTournamentID.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                dateSigned: event.target.dateSigned.value,
                durationPlayed: event.target.durationPlayed.value,
                chessPlayerID: event.target.chessPlayerID.value,
                chessTournamentID:event.target.chessTournamentID.value,
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
                            Update Chess Participation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Date Signed">
                                        <Form.Label>Date Signed</Form.Label>
                                        <Form.Control type="text" name="dateSigned" required
                                            placeholder={this.props.prdate} />
                                    </Form.Group>
                                    <Form.Group controlId="Duration Played">
                                        <Form.Label>Duration Played</Form.Label>
                                        <Form.Control type="text" name="durationPlayed" required 
                                        placeholder={this.props.prtime} />
                                    </Form.Group>

                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        placeholder={this.props.prdescription} />
                                    </Form.Group>

                                    <Form.Group controlId="ChessPlayerID" className="d-flex flex-column">
                                        <Form.Label>Chess Players</Form.Label>
                                            <Form.Select name="chessPlayerID" required defaultValue={this.props.prplayerid}>
                                                {this.state.chessPlayers.map((player) => (
                                                    <option key={player.id} value={player.id}>{player.name}</option>
                                                ))}
                                            </Form.Select>
                                    </Form.Group>

                                    <Form.Group controlId="ChessTournamentID" className="d-flex flex-column">
                                        <Form.Label>Chess Tournaments</Form.Label>
                                            <Form.Select name="chessTournamentID" required defaultValue={this.props.prtournamentid}>
                                                {this.state.chessTournaments.map((tournament) => (
                                                    <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
                                                ))}
                                            </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="my-3">
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Update Chess Participation
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