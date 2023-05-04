import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddParticipationModal } from './AddParticipationModal';
import { DetailsParticipationModal } from './DetailsParticipationModal';
import { UpdateParticipationModal } from './UpdateParticipationModal';
import { DescriptionParticipationModal } from './DescriptionParticipationModal';

export class Participation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participations: [], currentPage: 1, itemsPerPage: 5, totalPages: 0,
            addModalShow: false, updateModalShow: false, detailsModalShow: false, descriptionModalShow: false
        };
    }

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chessplayers/participations?page=${currentPage}&limit=${itemsPerPage}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const updatedParticipations = [];
                this.setState({totalPages: data.totalPages })
                const partyPromises = data.data.map(party => {
                    // Fetch data for each player using the /chessplayers/{id} endpoint
                    const partyUrl = `${process.env.REACT_APP_API}chessplayers/${party.chessTournamentID}/participations/${party.chessPlayerID}`;
                    return fetch(partyUrl).then(response => response.json());
                });

                Promise.all(partyPromises).then(partyData => {
                    // Combine the player data with the original player object
                    for (let i = 0; i < data.data.length; i++) {
                        updatedParticipations.push({
                            ...data.data[i],
                            ...partyData[i]
                        });
                    }
                    this.setState({ participations: updatedParticipations });
                });
            });
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteParticipation(playerID, tournamentID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'chessplayers/' + tournamentID + '/participation/' + playerID, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/js on'
                }
            })
        }
    }
      
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.refreshList);
    };

    render() {
        const { participations, prdate, prtime, prplayerid, prplayer, prtournament, prtournamentid, prdescription, currentPage, totalPages } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let updateModalClose = () => this.setState({ updateModalShow: false });
        let detailsModalClose = () => this.setState({ detailsModalShow: false });
        let descriptionModalClose = () => this.setState({ descriptionModalShow: false });

        let pageButtons = [];
        if (totalPages <= 10) {
          // less than 10 pages, show all buttons
          for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant={i === currentPage ? "primary" : "outline-primary"}
                onClick={() => this.handlePageChange(i)}
              >
                {i}
              </Button>
            );
          }
        } else {
          // more than 10 pages, show current page, 2 before and 2 after,
          // and first and last page buttons
          if (currentPage <= 3) {
            // show first 5 buttons and "..." button
            for (let i = 1; i <= 5; i++) {
              pageButtons.push(
                <Button
                  style={{ marginLeft: "2px" }}
                  variant={i === currentPage ? "primary" : "outline-primary"}
                  onClick={() => this.handlePageChange(i)}
                >
                  {i}
                </Button>
              );
            }
            pageButtons.push(<Button variant="outline-primary" style={{ marginLeft: '2px', marginRight: '2px' }}>.....</Button>);
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant="outline-primary"
                onClick={() => this.handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            );
          } else if (currentPage >= totalPages - 2) {
            // show last 5 buttons and "..." button
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant="outline-primary"
                onClick={() => this.handlePageChange(1)}
              >
                1
              </Button>
            );
            pageButtons.push(<Button variant="outline-primary" style={{ marginLeft: '2px', marginRight: '2px' }}>.....</Button>);
            for (let i = totalPages - 4; i <= totalPages; i++) {
              pageButtons.push(
                <Button
                  style={{ marginLeft: "2px" }}
                  variant={i === currentPage ? "primary" : "outline-primary"}
                  onClick={() => this.handlePageChange(i)}
                >
                  {i}
                </Button>
              );
            }
          } else {
            // show current page, 2 before and 2 after, and first and last page buttons
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant="outline-primary"
                onClick={() => this.handlePageChange(1)}
              >
                1
              </Button>
            );
            pageButtons.push(<Button variant="outline-primary" style={{ marginLeft: '2px', marginRight: '2px' }}>.....</Button>);
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
              pageButtons.push(
                <Button
                  style={{ marginLeft: "2px" }}
                  variant={i === currentPage ? "primary" : "outline-primary"}
                  onClick={() => this.handlePageChange(i)}
                >
                  {i}
                </Button>
              );
            }
            pageButtons.push(<Button variant="outline-primary" style={{ marginLeft: '2px', marginRight: '2px' }}>.....</Button>);
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant="outline-primary"
                onClick={() => this.handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            );
          }
        }

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Date Signed
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Duration Played
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Options
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {participations.map(party =>
                            <tr>
                                <td>{party.dateSigned}</td>
                                <td>{party.durationPlayed}</td>
                                <td>
                                <ButtonToolbar>
                                    
                                    <Button className="mr-2" onClick={() => this.setState({
                                        descriptionModalShow: true,
                                        prdescription: party.description
                                    })}>
                                        Description
                                    </Button>

                                    <DescriptionParticipationModal show={this.state.descriptionModalShow}
                                        onHide={descriptionModalClose}
                                        prdescription = {prdescription}
                                    />  

                                    <Button className="mr-2" variant="info"
                                        onClick={() => 
                                            this.setState({
                                                detailsModalShow: true,
                                                prplayer: party.chessPlayer,
                                                prtournament: party.chessTournament })}>
                                        Details
                                    </Button>
                                        
                                    <DetailsParticipationModal show={this.state.detailsModalShow}
                                        onHide={detailsModalClose}
                                        prplayer={prplayer}
                                        prtournament={prtournament}
                                    />                   

                                    <Button className="mr-2" variant="warning"
                                    onClick={()=>this.setState({
                                    updateModalShow:true,
                                    prdate: party.dateSigned,
                                    prtime: party.durationPlayed,
                                    prdescription: party.description,
                                    prplayerid: party.chessPlayerID,
                                    prtournamentid: party.chessTournamentID})}>
                                        Update
                                    </Button>

                                    <Button className="mr-2" variant="danger" 
                                    onClick={()=>this.deleteParticipation(party.chessPlayerID, party.chessTournamentID)}>
                                        Delete
                                    </Button>

                                </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant = 'primary'
                    onClick = {() => this.setState({addModalShow:true})}>
                        +
                    </Button>

                    <AddParticipationModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddParticipationModal>

                </ButtonToolbar>

                <ButtonToolbar style={{ display: 'flex', justifyContent: 'center' }}>
                        {currentPage !== 1 && (
                            <Button
                            style={{ marginLeft: '2px', marginRight: '2px' }}
                            onClick={() => this.handlePageChange(1)}
                            >
                            1
                            </Button>
                        )}
                        {currentPage > 3 && <span style={{ fontSize: '1.5em' }}>...</span>}
                        {currentPage > 2 && (
                            <Button
                            style={{ marginLeft: '2px', marginRight: '2px' }}
                            onClick={() => this.handlePageChange(currentPage - 1)}
                            >
                            {currentPage - 1}
                            </Button>
                        )}
                        <Button style={{ marginLeft: '2px', marginRight: '2px' }} disabled>
                            {currentPage}
                        </Button>
                        {currentPage < totalPages - 1 && (
                            <Button
                            style={{ marginLeft: '2px', marginRight: '2px' }}
                            onClick={() => this.handlePageChange(currentPage + 1)}
                            >
                            {currentPage + 1}
                            </Button>
                        )}
                        {currentPage < totalPages - 2 && <span style={{ fontSize: '1.5em' }}>...</span>}
                        {currentPage !== totalPages && (
                            <Button
                            style={{ marginLeft: '2px', marginRight: '2px' }}
                            onClick={() => this.handlePageChange(totalPages)}
                            >
                            {totalPages}
                            </Button>
                        )}
                    </ButtonToolbar>
            </div>
        )
    }
}