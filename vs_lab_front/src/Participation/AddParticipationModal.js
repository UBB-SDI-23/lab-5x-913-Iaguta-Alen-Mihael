import { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Row, Col, Form} from 'react-bootstrap';

export class AddParticipationModal extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { chessPlayers: [], chessTournaments: [] };
    }

    componentDidMount() {

        fetch(process.env.REACT_APP_API+'chesstournament')
        .then(response => response.json())
        .then(data => {
            this.setState({ chessTournaments: data.data });
        });

        fetch(process.env.REACT_APP_API+'chessplayers')
        .then(response => response.json())
        .then(data => {
            this.setState({ chessPlayers: data.data });
        });

    }



    handleSubmit(event){
        event.preventDefault();

        fetch(process.env.REACT_APP_API+'chessplayers/' + event.target.chessPlayerID.value + '/participations/' + event.target.chessTournamentID.value,{
            method:'POST',
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
                            Add Chess Participation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Date Signed">
                                        <Form.Label>Date Signed</Form.Label>
                                        <Form.Control type="text" name="dateSigned" required 
                                        placeholder="dd-mm-yyyy"/>
                                    </Form.Group>
                                    <Form.Group controlId="Duration Played">
                                        <Form.Label>Duration Played</Form.Label>
                                        <Form.Control type="text" name="durationPlayed" required 
                                        placeholder="hh-mm-ss"/>
                                    </Form.Group>

                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        placeholder="Short description about participation"/>
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
                                            Add Chess Participation
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