import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddPlayerModal } from './AddPlayerModal';
import { UpdatePlayerModal } from './UpdatePlayerModal';
import { TrophyReportPlayerModal } from './TrophyReportPlayerModal';
import { RatingReportPlayerModal } from './RatingReportPlayerModal';
import { DetailsPlayerModal } from './DetailsPlayerModal';
import { DescriptionPlayerModal } from './DescriptionPlayerModal';

export class Player extends Component{

    constructor(props){
        super(props);
        this.state={players:[], currentPage: 1, itemsPerPage: 5,
            addModalShow: false, updateModalShow: false, descriptionModalShow:false, detailsModalShow: false,
            trophyReportModalShow: false, ratingReportModalShow: false
        };
    }

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chessplayers?page=${currentPage}&limit=${itemsPerPage}`;
        
        
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const updatedPlayers = [];
            const playerPromises = data.map(player => {
              // Fetch data for each player using the /chessplayers/{id} endpoint
              const playerUrl = `${process.env.REACT_APP_API}chessplayers/${player.id}`;
              return fetch(playerUrl).then(response => response.json());
            });
      
            Promise.all(playerPromises).then(playerData => {
              // Combine the player data with the original player object
              for (let i = 0; i < data.length; i++) {
                updatedPlayers.push({
                  ...data[i],
                  ...playerData[i]
                });
              }
              this.setState({ players: updatedPlayers });
            });
          });
      }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
          this.refreshList();
        }
      }
      

    deletePlayer(plid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'chessplayers/'+plid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                        'Content-Type':'application/json'}
            })
        }
    }

    ratingSort(){
        let playas = this.state.players;
        playas.sort((a,b) => b.rating - a.rating);
        this.setState({players: playas});
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
      

    render(){
        const {players, plid, plname, plcountry, plrating, plismaster, plstartyear, pldescription, plchampions, currentPage} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let updateModalClose = () => this.setState({updateModalShow:false});
        let trophyReportModalClose = () => this.setState({ trophyReportModalShow: false });
        let ratingReportModalClose = () => this.setState({ ratingReportModalShow: false });
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
                                    Country
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" 
                                style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}
                                onClick={() => this.ratingSort()}>
                                    Rating ⇩
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    IsMaster
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    StartYear
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Participations
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
                        {players.map(player => {
                            return (
                                <tr key={player.id}>
                                    <td>{player.name}</td>
                                    <td>{player.country}</td>
                                    <td>{player.rating}</td>
                                    <td>{player.isMaster}</td>
                                    <td>{player.startYear}</td>
                                    <td>{player.playerParticipations.length}</td>
                                    <td>
                                        <ButtonToolbar>

                                            <Button className="mr-2" onClick={() => this.setState({
                                                descriptionModalShow: true,
                                                pldescription: player.description
                                            })}>
                                                Description
                                            </Button>

                                            <DescriptionPlayerModal show={this.state.descriptionModalShow}
                                                onHide={descriptionModalClose}
                                                pldescription = {pldescription}
                                            />

                                            <Button className="mr-2" variant="info"
                                                onClick={() =>
                                                    this.setState({
                                                        detailsModalShow: true,
                                                        plchampions: player.chessChampions})}>
                                                Details
                                            </Button>

                                            <DetailsPlayerModal show={this.state.detailsModalShow}
                                                onHide={detailsModalClose}
                                                plchampions = {plchampions}
                                            />

                                            <Button className="mr-2" variant="warning"
                                                onClick={() => this.setState({
                                                    updateModalShow: true,
                                                    plid: player.id,
                                                    plname: player.name,
                                                    plcountry: player.country,
                                                    plrating: player.rating,
                                                    plismaster: player.isMaster,
                                                    plstartyear: player.startYear,
                                                    pldescription: player.description
                                                })
                                                }>
                                                Update
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                                onClick={() => this.deletePlayer(player.id)}>
                                                Delete
                                            </Button>

                                            <UpdatePlayerModal show={this.state.updateModalShow}
                                                onHide={updateModalClose}
                                                plid={plid}
                                                plname={plname}
                                                plcountry={plcountry}
                                                plrating={plrating}
                                                plismaster={plismaster}
                                                plstartyear={plstartyear}
                                                pldescription={pldescription}>
                                            </UpdatePlayerModal>

                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant = 'primary'
                    onClick = {() => this.setState({addModalShow:true})}>
                        +
                    </Button>

                    <Button variant = 'primary' style={{ marginLeft: '2px' }}
                    onClick = {() => this.setState({trophyReportModalShow:true})}>
                        $
                    </Button>

                    <Button variant = 'primary' style={{ marginLeft: '2px' }}
                    onClick = {() => this.setState({ratingReportModalShow:true})}>
                        ✰
                    </Button>

                    <div className='ml-auto'>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handlePrevPage}>Prev</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handleNextPage}>Next</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={() => this.handlePageChange(1)}>{currentPage}</Button>
                    </div>

                    <AddPlayerModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddPlayerModal>
                    
                    <TrophyReportPlayerModal show={this.state.trophyReportModalShow}
                        onHide={trophyReportModalClose}>
                    </TrophyReportPlayerModal>

                    <RatingReportPlayerModal show={this.state.ratingReportModalShow}
                        onHide={ratingReportModalClose}>
                    </RatingReportPlayerModal>
                    
                </ButtonToolbar>
            </div>
        )
    }
}