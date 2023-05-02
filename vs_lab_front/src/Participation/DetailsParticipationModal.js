import { Component } from 'react';
import { Button, Modal, Table } from "react-bootstrap";

export class DetailsParticipationModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = { chessPlayer: [], chessTournament: [] }
    }
    
    componentDidMount() {
        fetch(process.env.REACT_APP_API+'chessplayers/'+this.props.prplayerid)
        .then(response => response.json())
        .then(data => {
            this.setState({ chessPlayer: data });
        });

        fetch(process.env.REACT_APP_API+'chesstournament/'+this.props.prtournamentid)
        .then(response => response.json())
        .then(data => {
            this.setState({ chessTournament: data });
        });
    }

    render() {
        return (
          <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-vcenter'>Participation Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Rating</th>
                        <th>Is Master</th>
                        <th>Start Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.chessPlayer ? (
                            <tr>
                                <td>{this.state.chessPlayer.name}</td>
                                <td>{this.state.chessPlayer.country}</td>
                                <td>{this.state.chessPlayer.rating}</td>
                                <td>{this.state.chessPlayer.isMaster}</td>
                                <td>{this.state.chessPlayer.startYear}</td>
                            </tr>
                    ) : (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Participants</th>
                        <th>Host</th>
                        <th>Prize Money</th>
                        <th>Trophy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.chessTournament ? (
                            <tr>
                                <td>{this.state.chessTournament.name}</td>
                                <td>{this.state.chessTournament.numParticipants}</td>
                                <td>{this.state.chessTournament.host}</td>
                                <td>{this.state.chessTournament.prizeMoney}</td>
                                <td>{this.state.chessTournament.trophy}</td>
                            </tr>
                    ) : (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    )}
                    </tbody>
              </Table>    
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={this.props.onHide}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        );
      }
}