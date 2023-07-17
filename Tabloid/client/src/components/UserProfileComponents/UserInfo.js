import React, { useEffect, useState } from 'react';
import { getAllUsers, getUserByFirebaseId } from '../../modules/profileManager';
import { Button, Table } from 'reactstrap';
import { UserProfileModal } from './UserProfileModal';
import '../UserProfileComponents/tables.css';

const UserInfo = () => {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  // const [closeAll, setCloseAll] = useState(false);
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // Updated to null

  const getUsers = () => {
    getAllUsers().then((users) => setUsers(users));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const toggleModal = async (firebaseUserId) => {
    try {
      const user = await getUserByFirebaseId(firebaseUserId);
      setUserDetails(user);
      setModal(!modal);
    } catch (error) {
      console.error('An error occurred while fetching user details:', error);
      // Handle the error gracefully (e.g., display an error message)
    }
  };
  

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    // Toggle nested modal
    ;
  };

  const closeModal = () => { setModal(false) };

  return (
    <>
      <UserProfileModal 
      isOpen={modal} 
      toggle={toggleModal} 
      closeModal={closeModal} 
      toggleNested={toggleNested} 
      userDetails={userDetails}
      // closeAll={closeAll}
      nestedModal={nestedModal}
      size="lg" />
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
