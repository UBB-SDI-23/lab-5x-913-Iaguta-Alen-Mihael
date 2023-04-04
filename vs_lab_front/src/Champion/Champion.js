import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddChampionModal } from './AddChampionModal';
import { UpdateChampionModal } from './UpdateChampionModal';

export class Champion extends Component{

    constructor(props){
        super(props);
        this.state={champs:[], addModalShow: false, updateModalShow: false};
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'chesschampions')
        .then(response => response.json())
        .then(data => {
            this.setState({champs:data});
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteChampion(chid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'chesschampions/'+chid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }


    render(){
        const {champs, chid, chlasttrophy, chrecord, chmaxrating, chconsecutiveyears, chcurrent, chplayerid} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let updateModalClose = () => this.setState({updateModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Last Trophy</th>
                            <th>Record</th>
                            <th>Max Rating</th>
                            <th>Consecutive Years</th>
                            <th>Current</th>
                            <th>Chess Player ID</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {champs.map(champ =>
                            <tr key={champ.id}>
                                <td>{champ.id}</td>
                                <td>{champ.lastTrophy}</td>
                                <td>{champ.record}</td>
                                <td>{champ.maxRating}</td>
                                <td>{champ.consecutiveYears}</td>
                                <td>{champ.current}</td>
                                <td>{champ.chessPlayerID}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info">
                                        Details
                                    </Button>

                                    <Button className="mr-2" variant="warning"
                                    onClick={()=>this.setState({
                                        updateModalShow:true,
                                        chid:champ.id,
                                        chlasttrophy:champ.lastTrophy,
                                        chrecord:champ.record,
                                        chmaxrating:champ.maxRating,
                                        chconsecutiveyears:champ.consecutiveYears,
                                        chcurrent:champ.current,
                                        chplayerid:champ.chessPlayerID,})}>
                                            Update
                                        </Button>

                                        <Button className="mr-2" variant="danger" 
                                        onClick={()=>this.deleteChampion(champ.id)}>
                                            Delete
                                        </Button>

                                        <UpdateChampionModal show={this.state.updateModalShow}
                                        onHide={updateModalClose}
                                        chid={chid}
                                        chlasttrophy={chlasttrophy}
                                        chrecord={chrecord}
                                        chmaxrating={chmaxrating}
                                        chconsecutiveyears={chconsecutiveyears}
                                        chcurrent={chcurrent}
                                        chplayerid={chplayerid}
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
                    <AddChampionModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddChampionModal>
                </ButtonToolbar>
            </div>
        )
    }
}