import React, { useEffect, useState } from 'react';
import { getAllUsers, getUserByFirebaseId } from '../../modules/profileManager';
import { Button, Table } from 'reactstrap';
import { UserProfileModal } from './UserProfileModal';
import '../UserProfileComponents/tables.css';

const UserInfo = () => {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // Updated to null

  const getUsers = () => {
    getAllUsers().then((users) => setUsers(users));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const toggleModal = async (firebaseUserId) => {
    const user = await getUserByFirebaseId(firebaseUserId); // Fetch user details
    setUserDetails(user); // Set user details in state
    setModal(!modal);
  };

  const closeModal = () => {setModal(false)};

  return (
    <>
      <UserProfileModal isOpen={modal} toggle={toggleModal} closeModal={closeModal} userDetails={userDetails} size="lg" />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Display Name</th>
            </tr>
          </thead>
          <tbody className='mouse'>
            {users.map((user) => (
              <tr key={user.firebaseUserId} onClick={() => toggleModal(user.firebaseUserId)}>
                <td>{user.id}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.displayName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UserInfo;
