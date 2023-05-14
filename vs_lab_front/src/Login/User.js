import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, DropdownButton, Dropdown, Table } from 'react-bootstrap';

export function User(props) {
    const [user, setUser] = useState(null);
    const [selectedRows, setSelectedRows] = useState(1);
    const { userid } = useParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_API + `userprofiles/${userid}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.log(error));
    }, [userid]);

    useEffect(() => {
        const rows = localStorage.getItem('selectedRows');
        if (rows) {
            setSelectedRows(parseInt(rows));
        }
    }, []);

    const handleSelect = (eventKey) => {
        console.log(`Selected option ${eventKey}`);
        setSelectedRows(parseInt(eventKey));
        localStorage.setItem('selectedRows', eventKey);
    };

    return (
        <Container>
            {user && (
                <div>
                    <h1 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                        {user.userName}'s profile
                    </h1>
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td>
                                <strong>Bio:</strong>
                            </td>
                            <td>{user.bio}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Birthdate:</strong>
                            </td>
                            <td>{user.birthDate}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Phone Number:</strong>
                            </td>
                            <td>{user.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Players:</strong>
                            </td>
                            <td>{user.chessPlayers.length}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Tournaments:</strong>
                            </td>
                            <td>{user.chessTournaments.length}</td>
                        </tr>
                        {props.username === user.userName && (
                            <tr>
                                <td>
                                    <strong>Rows:</strong>
                                </td>
                                <td>
                                    <DropdownButton title={selectedRows} onSelect={handleSelect}>
                                        {[1, 2, 3, 4, 5].map((option) => (
                                            <Dropdown.Item key={option} eventKey={option}>
                                                {option}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
}
