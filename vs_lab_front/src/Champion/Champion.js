import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddChampionModal } from './AddChampionModal';
import { UpdateChampionModal } from './UpdateChampionModal';
import { DetailsChampionModal } from './DetailsChampionModal';
export class Champion extends Component{

    constructor(props){
        super(props);
        this.state = {
            champions: [], currentPage: 1, itemsPerPage: 10,
            addModalShow: false, updateModalShow: false, detailsModalShow: false
        };
    }

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chesschampions?page=${currentPage}&limit=${itemsPerPage}`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const updatedChampions = [];
            const championPromises = data.map(champ => {
              // Fetch data for each player using the /chessplayers/{id} endpoint
              const champUrl = `${process.env.REACT_APP_API}chesschampions/${champ.id}`;
              return fetch(champUrl).then(response => response.json());
            });
      
            Promise.all(championPromises).then(champData => {
              // Combine the player data with the original player object
              for (let i = 0; i < data.length; i++) {
                updatedChampions.push({
                  ...data[i],
                  ...champData[i]
                });
              }
              this.setState({ champions: updatedChampions });
            });
          });
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

    handlePrevPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
          this.setState({ currentPage: currentPage - 1 });
        }
      };
      
      handleNextPage = () => {
        const { currentPage } = this.state;
        this.setState({ currentPage: currentPage + 1 });
      };
      
      handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
      };


    render() {
        const { champions, chid, chlasttrophy, chrecord, chmaxrating, chconsecutiveyears, chcurrent, chplayer, currentPage, itemsPerPage } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let updateModalClose = () => this.setState({ updateModalShow: false });
        let detailsModalClose = () => this.setState({ detailsModalShow: false });

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentChampions = champions.slice(indexOfFirstItem, indexOfLastItem);

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Last Trophy
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Record
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Max Rating
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Consecutive Years
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Current
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
                        {currentChampions.map(champ =>
                            <tr key={champ.id}>
                                <td>{champ.lastTrophy}</td>
                                <td>{champ.record}</td>
                                <td>{champ.maxRating}</td>
                                <td>{champ.consecutiveYears}</td>
                                <td>{champ.current}</td>
                                <td>
                                <ButtonToolbar>
                                    
                                    <Button className="mr-2" variant="info"
                                        onClick={() => 
                                            this.setState({
                                                detailsModalShow: true,
                                                chplayer: champ.chessPlayer })}>
                                        Details
                                    </Button>
                                        
                                    <DetailsChampionModal show={this.state.detailsModalShow}
                                        onHide={detailsModalClose}
                                        chplayer={chplayer}
                                    />

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

                    <AddChampionModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddChampionModal>
                </ButtonToolbar>
            </div>
        )
    }
}