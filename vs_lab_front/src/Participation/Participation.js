import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

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
    
}