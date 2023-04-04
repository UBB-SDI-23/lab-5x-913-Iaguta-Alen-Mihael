import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";

export class DetailsPlayerModal extends Component {

  constructor(props) {
    super(props);
    this.champs = this.props.chessChampions;
  }

  render() {
    return (
      <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Player Trophies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
          <thead>
                <tr>
                  <th>ID</th>
                  <th>Last Trophy</th>
                  <th>Record</th>
                  <th>Max Rating</th>
                  <th>Consecutive Years</th>
                  <th>Current</th>
                  <th>Chess Player ID</th>
                </tr>
              </thead>
              <tbody>
                {this.champs.map((champ) => (
                  <tr key={champ.id}>
                    <td>{champ.id}</td>
                    <td>{champ.lastTrophy}</td>
                    <td>{champ.record}</td>
                    <td>{champ.maxRating}</td>
                    <td>{champ.consecutiveYears}</td>
                    <td>{champ.current}</td>
                    <td>{champ.chessPlayerID}</td>
                  </tr>
                ))}
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