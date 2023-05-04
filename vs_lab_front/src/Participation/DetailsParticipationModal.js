import { Component } from 'react';
import { Button, Modal, Table } from "react-bootstrap";

export class DetailsParticipationModal extends Component {

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
                        {this.state.prplayer ? (
                            <tr>
                                <td>{this.state.prplayer.name}</td>
                                <td>{this.state.prplayer.country}</td>
                                <td>{this.state.prplayer.rating}</td>
                                <td>{this.state.prplayer.isMaster}</td>
                                <td>{this.state.prplayer.startYear}</td>
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
                        {this.state.prtournament ? (
                            <tr>
                                <td>{this.state.prtournament.name}</td>
                                <td>{this.state.prtournament.numParticipants}</td>
                                <td>{this.state.prtournament.host}</td>
                                <td>{this.state.prtournament.prizeMoney}</td>
                                <td>{this.state.prtournament.trophy}</td>
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