import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";

export class DescriptionPlayerModal extends Component {
  
  render() {
    return (
      <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Chess Player Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
              <p>{this.props.pldescription}</p>
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