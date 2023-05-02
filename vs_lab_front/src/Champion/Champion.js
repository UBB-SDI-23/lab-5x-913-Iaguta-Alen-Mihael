import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddChampionModal } from './AddChampionModal';
import { UpdateChampionModal } from './UpdateChampionModal';
import { DetailsChampionModal } from './DetailsChampionModal';
import { DescriptionChampionModal } from './DescriptionChampionModal';
export class Champion extends Component{

    constructor(props){
        super(props);
        this.state = {
            champions: [], currentPage: 1, itemsPerPage: 5, totalPages: 0,
            addModalShow: false, updateModalShow: false, detailsModalShow: false, descriptionModalShow: false
        };
    }

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chesschampions?page=${currentPage}&limit=${itemsPerPage}`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const updatedChampions = [];
            this.setState({ totalPages: data.totalPages });
            const championPromises = data.data.map(champ => {
              // Fetch data for each player using the /chessplayers/{id} endpoint
              const champUrl = `${process.env.REACT_APP_API}chesschampions/${champ.id}`;
              return fetch(champUrl).then(response => response.json());
            });
      
            Promise.all(championPromises).then(champData => {
              // Combine the player data with the original player object
              for (let i = 0; i < data.data.length; i++) {
                updatedChampions.push({
                  ...data.data[i],
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
        const { champions, chid, chlasttrophy, chrecord, chmaxrating, chconsecutiveyears, chcurrent, chplayerid, chplayer, chdescription, currentPage, totalPages } = this.state;
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
                        {champions.map(champ =>
                            <tr key={champ.id}>
                                <td>{champ.lastTrophy}</td>
                                <td>{champ.record}</td>
                                <td>{champ.maxRating}</td>
                                <td>{champ.consecutiveYears}</td>
                                <td>{champ.current}</td>
                                <td>
                                <ButtonToolbar>
                                    
                                    <Button className="mr-2" onClick={() => this.setState({
                                        descriptionModalShow: true,
                                        chdescription: champ.description
                                    })}>
                                        Description
                                    </Button>

                                    <DescriptionChampionModal show={this.state.descriptionModalShow}
                                        onHide={descriptionModalClose}
                                        chdescription = {chdescription}
                                    />   

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
                                    chcurrent: champ.current,
                                    chdescription: champ.description,
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
                                    chdescription={chdescription}        
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