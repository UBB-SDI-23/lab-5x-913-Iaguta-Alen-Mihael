import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddPlayerModal } from './AddPlayerModal';
import { UpdatePlayerModal } from './UpdatePlayerModal';
import { ReportPlayerModal } from './ReportPlayerModal';
import { DetailsPlayerModal } from './DetailsPlayerModal';

export class Player extends Component{

    constructor(props){
        super(props);
        this.state={players:[], currentPage: 1, itemsPerPage: 10,
             addModalShow: false, updateModalShow: false, reportModalShow: false, detailsModalShow: false};
    }

    refreshList(){
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chessplayers?page=${currentPage}&limit=${itemsPerPage}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({players: data});
        })
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

    handlePrevPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
          this.setState({ currentPage: currentPage - 1 }, () => this.refreshList());
        }
      };
      
      handleNextPage = () => {
        const { currentPage } = this.state;
        this.setState({ currentPage: currentPage + 1 }, () => this.refreshList());
      };
      
      handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, () => this.refreshList());
      };
      

    render(){
        const {players, plid, plname, plcountry, plrating, plismaster, plstartyear, selectedPlayerID, currentPage, itemsPerPage} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let updateModalClose = () => this.setState({updateModalShow:false});
        let reportModalClose = () => this.setState({reportModalShow:false});
        let detailsModalClose = () => this.setState({detailsModalShow:false});

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentPlayers = players.slice(indexOfFirstItem, indexOfLastItem);

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
                                    Options
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPlayers.map(player =>
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.country}</td>
                                <td>{player.rating}</td>
                                <td>{player.isMaster}</td>
                                <td>{player.startYear}</td>
                                <td>
                                <ButtonToolbar>

                                    <Button className="mr-2" variant="info"
                                        onClick={() => this.setState({
                                            detailsModalShow: true,
                                            selectedPlayerID: player.id})
                                            }>
                                        Details
                                    </Button>

                                    <DetailsPlayerModal show={this.state.detailsModalShow}
                                        onHide={detailsModalClose}
                                        selectedPlayerID ={selectedPlayerID}
                                    />

                                    <Button className="mr-2" variant="warning"
                                        onClick={()=>this.setState({
                                        updateModalShow:true,
                                        plid:player.id,
                                        plname:player.name,
                                        plcountry:player.country,
                                        plrating:player.rating,
                                        plismaster:player.isMaster,
                                        plstartyear:player.startYear})
                                        }>
                                            Update
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deletePlayer(player.id)}>
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

                    <Button variant = 'primary' style={{ marginLeft: '2px' }}
                    onClick = {() => this.setState({reportModalShow:true})}>
                        $
                    </Button>

                    <div className='ml-auto'>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handlePrevPage}>Prev</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handleNextPage}>Next</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={() => this.handlePageChange(1)}>{currentPage}</Button>
                    </div>
                    
                    <ReportPlayerModal show={this.state.reportModalShow}
                        onHide={reportModalClose}>
                    </ReportPlayerModal>
                    <AddPlayerModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddPlayerModal>
                    
                </ButtonToolbar>
            </div>
        )
    }
}