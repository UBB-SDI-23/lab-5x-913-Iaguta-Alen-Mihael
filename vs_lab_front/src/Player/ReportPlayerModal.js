import React, { Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export class ReportPlayerModal extends Component {
    
  constructor(props) {
    super(props);
    this.state = { trophies: [] };
  }

  componentDidMount() {
    this.getTrophies();
  }

  componentDidUpdate(){
    this.getTrophies();
  }

  getTrophies = () => {
    fetch(process.env.REACT_APP_API + 'chessplayers/trophies')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ trophies: data });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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
                <th>Name</th>
                <th>Trophies</th>
              </tr>
            </thead>
            <tbody>
              {this.state.trophies.map((trophy) => (
                <tr key={trophy.id}>
                  <td>{trophy.id}</td>
                  <td>{trophy.name}</td>
                  <td>{trophy.trophies}</td>
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