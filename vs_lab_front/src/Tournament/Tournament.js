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
            tournaments: [], currentPage: 1, itemsPerPage: 5,
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
      
          for (let i = 0; i < data.length; i++) {
            const tournamentUrl = `${process.env.REACT_APP_API}chesstournament/${data[i].id}`;
            const tournamentResponse = await fetch(tournamentUrl);
            const tournamentData = await tournamentResponse.json();
      
            updatedTournaments.push({
              ...data[i],
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
        const { tournaments, trid, trname, trnumparticipants, trhost, trprizemoney, trtrophy, trparticipations, trdescription, currentPage } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let updateModalClose = () => this.setState({ updateModalShow: false });
        let detailsModalClose = () => this.setState({ detailsModalShow: false });
        let descriptionModalClose = () => this.setState({ descriptionModalShow: false });

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

                    <div className='ml-auto'>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handlePrevPage}>Prev</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handleNextPage}>Next</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={() => this.handlePageChange(1)}>{currentPage}</Button>
                    </div>

                    <AddTournamentModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddTournamentModal>
                </ButtonToolbar>
            </div>
        )
    }
}