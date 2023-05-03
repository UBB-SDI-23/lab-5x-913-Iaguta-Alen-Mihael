import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddPlayerModal } from './AddPlayerModal';
import { UpdatePlayerModal } from './UpdatePlayerModal';
import { DetailsPlayerModal } from './DetailsPlayerModal';
import { DescriptionPlayerModal } from './DescriptionPlayerModal';

export class Player extends Component{

    constructor(props){
        super(props);
        this.state={players:[], currentPage: 1, itemsPerPage: 5, totalPages: 0,
            addModalShow: false, updateModalShow: false, descriptionModalShow:false, detailsModalShow: false
        };
    }

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chessplayers?page=${currentPage}&limit=${itemsPerPage}`;
        
        
        fetch(url)
          .then(response => response.json())
          .then(data => {
              const updatedPlayers = [];
              this.setState({totalPages: data.totalPages })
              const playerPromises = data.data.map(player => {
              // Fetch data for each player using the /chessplayers/{id} endpoint
              const playerUrl = `${process.env.REACT_APP_API}chessplayers/${player.id}`;
              return fetch(playerUrl).then(response => response.json());
            });
      
            Promise.all(playerPromises).then(playerData => {
              // Combine the player data with the original player object
              for (let i = 0; i < data.data.length; i++) {
                updatedPlayers.push({
                  ...data.data[i],
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

    
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.refreshList);
    };
    

    render(){
        const {players, plid, plname, plcountry, plrating, plismaster, plstartyear, pldescription, plchampions, currentPage, totalPages} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let updateModalClose = () => this.setState({updateModalShow:false});
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
                                    Championships
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
                                    <td>{player.chessChampions.length}</td>
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

                    <AddPlayerModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddPlayerModal>
                    
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