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
        this.state={players:[], addModalShow: false, updateModalShow: false, reportModalShow: false, detailsModalShow: false};
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'chessplayers')
        .then(response => response.json())
        .then(data => {
            this.setState({players:data});
        })
    }   

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
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

    render(){
        const {players, plid, plname, plcountry, plrating, plismaster, plstartyear, selectedPlayerID} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let updateModalClose = () => this.setState({updateModalShow:false});
        let reportModalClose = () => this.setState({reportModalShow:false});
        let detailsModalClose = () => this.setState({detailsModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Rating</th>
                            <th>IsMaster</th>
                            <th>StartYear</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player =>
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
                                        plstartyear:player.startYear})}>
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