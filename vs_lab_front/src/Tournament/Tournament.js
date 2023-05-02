import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddTournamentModal } from './AddTournamentModal';
import { UpdateTournamentModal } from './UpdateTournamentModal';
import { DetailsTournamentModal } from './DetailsTournamentModal';
import { DescriptionTournamentModal } from './DescriptionTournamentModal';

export class Tournament extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            tournaments: [], currentPage: 1, itemsPerPage: 5, totalPages: 0,
            addModalShow: false, updateModalShow: false, detailsModalShow: false, descriptionModalShow: false
        };
    }

    async refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chesstournament?page=${currentPage}&limit=${itemsPerPage}`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          const updatedTournaments = [];
          this.setState({ totalPages: data.totalPages });
      
          for (let i = 0; i < data.data.length; i++) {
            const tournamentUrl = `${process.env.REACT_APP_API}chesstournament/${data.data[i].id}`;
            const tournamentResponse = await fetch(tournamentUrl);
            const tournamentData = await tournamentResponse.json();
      
            updatedTournaments.push({
              ...data.data[i],
              ...tournamentData
            });
          }
      
          this.setState({ tournaments: updatedTournaments });
        } catch (error) {
          console.error(error);
        }
      }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
          this.refreshList();
        }
      }

    deleteTournament(trid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'chesstournament/'+trid, {
                method: 'DELETE',
                header:{'Accept':'application/json',
                        'Content-Type':'application/json'}
            })
        }
    }

    handlePrevPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({ currentPage: currentPage - 1 });
            this.refreshList();
        }
      };
      
      handleNextPage = () => {
        const { currentPage } = this.state;
        this.setState({ currentPage: currentPage + 1 });
        this.refreshList();
      };
      
      handlePageChange = (pageNumber) => {
          this.setState({ currentPage: pageNumber });
          this.refreshList();
      };

      render() {
        const { tournaments, trid, trname, trnumparticipants, trhost, trprizemoney, trtrophy, trparticipations, trdescription, currentPage, totalPages } = this.state;
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
                                    Name
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Participants
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Host
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Prize Money
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Trophy
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
                        {tournaments.map(tournament =>
                            <tr key={tournament.id}>
                                <td>{tournament.name}</td>
                                <td>{tournament.numParticipants}</td>
                                <td>{tournament.host}</td>
                                <td>{tournament.prizeMoney}</td>
                                <td>{tournament.trophy}</td>
                                <td>
                                <ButtonToolbar>
                                    
                                <Button className="mr-2" onClick={() => this.setState({
                                        descriptionModalShow: true,
                                        trdescription: tournament.description
                                })}>
                                    Description
                                </Button>

                                <DescriptionTournamentModal show={this.state.descriptionModalShow}
                                    onHide={descriptionModalClose}
                                    trdescription = {trdescription}
                                />
                                    
                                        
                                    <Button className="mr-2" variant="info"
                                        onClick={() => 
                                            this.setState({
                                                detailsModalShow: true,
                                                trparticipations: tournament.tournamentParticipations })}>
                                        Details
                                    </Button>
                                        
                                    <DetailsTournamentModal show={this.state.detailsModalShow}
                                        onHide={detailsModalClose}
                                        trparticipations={trparticipations}
                                    />

                                    <Button className="mr-2" variant="warning"
                                    onClick={()=>this.setState({
                                    updateModalShow:true,
                                    trid: tournament.id,
                                    trname: tournament.name,
                                    trnumparticipants: tournament.numParticipants,
                                    trhost: tournament.host,
                                    trprizemoney: tournament.prizeMoney,
                                    trtrophy: tournament.trophy,
                                    trdescription: tournament.description})}>
                                        Update
                                    </Button>

                                    <Button className="mr-2" variant="danger" 
                                    onClick={()=>this.deleteTournament(tournament.id)}>
                                        Delete
                                    </Button>

                                    <UpdateTournamentModal show={this.state.updateModalShow}
                                    onHide={updateModalClose}
                                    trid={trid}
                                    trname={trname}
                                    trnumparticipants={trnumparticipants}
                                    trhost={trhost}
                                    trprizemoney={trprizemoney}
                                    trtrophy={trtrophy}
                                    trdescription = {trdescription}
                                    />
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

                    <AddTournamentModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddTournamentModal>
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