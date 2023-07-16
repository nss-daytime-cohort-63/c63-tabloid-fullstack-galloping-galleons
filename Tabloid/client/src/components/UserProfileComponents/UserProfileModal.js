import { React, useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

/*
Render an Activate or Deactivate button based on active state
I need a useState to hold if the user is active or not
I need a useEffect to set the state based on the information loading

*/

export function UserProfileModal({ isOpen, toggle, closeModal, userDetails, size }) {
  const [activeStatus, setActiveStatus] = useState();

  useEffect(() => {
    if (userDetails) {
      setActiveStatus(userDetails.active)
    };

    console.log(activeStatus);
  }, [userDetails])

  return (
    <Modal isOpen={isOpen} toggle={toggle} size={size}>
      <ModalHeader toggle={toggle}>User Profile</ModalHeader>
      <ModalBody>
        {userDetails ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={userDetails.imageLocation} />
            </div>
            <Table bordered>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Email Address</th>
                  <th>Creation Date</th>
                  <th>Profile Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>{`${userDetails.firstName} ${userDetails.lastName}`}</th>
                  <th>{userDetails.displayName}</th>
                  <th>{userDetails.email}</th>
                  <th>{userDetails.createDateTime}</th>
                  <th>{userDetails.userType.name}</th>
                </tr>
              </tbody>

            </Table>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
        {activeStatus === true ? (
        <div><Button color='danger'>Deactivate</Button></div>
        ) : (
          <div><Button color='success'>Activate</Button></div>
        )}
      </ModalBody>
        
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
