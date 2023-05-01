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
            participations: [], currentPage: 1, itemsPerPage: 10,
            addModalShow: false, updateModalShow: false, detailsModalShow: false
        };
    }

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chessplayers/participations?page=${currentPage}&limit=${itemsPerPage}`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
              this.setState({ participations: data });
          });
      }

    componentDidMount(){
        this.refreshList();
    }

    deleteParticipation(playerID, tournamentID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'chessplayers/'+tournamentID+'/participation/'+playerID ,{
                method:'DELETE',
                header:{'Accept':'application/json',
                        'Content-Type':'application/json'}
            })
        }
    }

    handlePrevPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
          this.setState({ currentPage: currentPage - 1 }, this.refreshList);
        }
      };
      
      handleNextPage = () => {
        const { currentPage } = this.state;
        this.setState({ currentPage: currentPage + 1 }, this.refreshList);
      };
      
      handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.refreshList);
    };


    render() {
        const { participations, prdate, prtime, prplayerid, prtournamentid, prdescription, currentPage } = this.state;
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



                                    <Button className="mr-2" variant="info"
                                        onClick={() => 
                                            this.setState({
                                                detailsModalShow: true,
                                                prplayerid: party.chessPlayerID,
                                                prtournamentid: party.chessTournamentID })}>
                                        Details
                                    </Button>
                                        


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

                    <div className='ml-auto'>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handlePrevPage}>Prev</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handleNextPage}>Next</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={() => this.handlePageChange(1)}>{currentPage}</Button>
                    </div>

                    <AddParticipationModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddParticipationModal>

                </ButtonToolbar>
            </div>
        )
    }
}