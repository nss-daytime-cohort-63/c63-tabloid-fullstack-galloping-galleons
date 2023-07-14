import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../modules/profileManager'
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';

const UserInfo = () => {
    const [user, setUsers] = useState([]);
    console.log(user);
    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));
    };

    useEffect(() => {
        getUsers();
    }, []);

    // const clickEventForGetUsers = () => {
    //     UserInfo();
    // }

    return (
        <>
            {/* <div><Button variant="Show All Users" onClick={clickEventForGetUsers}>Primary</Button>{''}</div> */}
            <div>
                
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Display Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            {user.map(u =>
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.firstName} {u.lastName}</td>
                                    <td>{u.displayName}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
            </div>
        </>
    )
}

export default UserInfo