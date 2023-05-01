import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export class TrophyStats extends Component{

    constructor(props){
        super(props);
        this.state={ champs:[], currentPage: 1, itemsPerPage: 10 };
    }
  
    componentDidMount(){
      this.refreshList();
    } 

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chessplayers/trophies?page=${currentPage}&limit=${itemsPerPage}`;
        
        fetch(url)
          .then(response => response.json())
          .then(data => {
              this.setState({ champs: data })
          });
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
        const { champs, currentPage } = this.state;

        return (
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
                                    Trophies
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {champs.map(trophy =>
                            <tr>
                                <td>{trophy.name}</td>
                                <td>{trophy.trophies}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>

                    <div className='ml-auto'>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handlePrevPage}>Prev</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={this.handleNextPage}>Next</Button>
                        <Button style={{ marginLeft: '2px' }} onClick={() => this.handlePageChange(1)}>{currentPage}</Button>
                    </div>

                </ButtonToolbar>
            </div>
        )
    }
}