import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Container, Button, Table} from 'react-bootstrap';

export function User() {
    const [user, setUser] = useState(null);
    const { userid } = useParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_API + `userprofiles/${userid}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.log(error));
    }, [userid]);

    const handleUpdate = () => {

    };



    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            fetch(process.env.REACT_APP_API + `userprofiles/${userid}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        // Redirect to the home page after successful deletion
                        window.location.href = '/';
                    } else {
                        console.log('Error deleting user');
                    }
                })
                .catch(error => console.log(error));
        }
    };


    return (
        <Container>
            <h1 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                Welcome to your profile, {user.userName}
            </h1>

            {user && (
                <div>
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Username:</strong></td>
                            <td>{user.userName}</td>
                        </tr>
                        <tr>
                            <td><strong>Bio:</strong></td>
                            <td>{user.bio}</td>
                        </tr>
                        <tr>
                            <td><strong>Birthdate:</strong></td>
                            <td>{user.birthDate}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone Number:</strong></td>
                            <td>{user.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Players:</strong></td>
                            <td>{user.chessPlayers.length}</td>
                        </tr>
                        <tr>
                            <td><strong>Tournaments:</strong></td>
                            <td>{user.chessTournaments.length}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="primary" onClick={handleUpdate}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </div>

                </div>
            )}
        </Container>
    );
}
