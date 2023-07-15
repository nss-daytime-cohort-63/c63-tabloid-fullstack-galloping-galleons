import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

export function UserProfileModal({ isOpen, toggle, closeModal, userDetails, size }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size={size}>
      <ModalHeader toggle={toggle}>User Profile</ModalHeader>
      <ModalBody>
        {userDetails ? (
          <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
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
        <div><button>Deactivate</button></div>

      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
