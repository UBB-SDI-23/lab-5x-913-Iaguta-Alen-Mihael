import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export class RatingStats extends Component{

    constructor(props){
        super(props);
        this.state={ players:[], currentPage: 1, itemsPerPage: 10 };
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
}