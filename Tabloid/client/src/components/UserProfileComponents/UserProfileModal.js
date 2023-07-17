import { React, useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

/*
Render an Activate or Deactivate button based on active state
I need a useState to hold if the user is active or not
I need a useEffect to set the state based on the information loading

*/

export function UserProfileModal({ isOpen, toggle, closeModal, userDetails, toggleNested, nestedModal, toggleAll, closeAll, size }) {
  const [activeStatus, setActiveStatus] = useState();

  useEffect(() => {
    if (userDetails) {
      setActiveStatus(userDetails.active)
    };
  }, [userDetails])

  const confirmActivate = (userId) => {
    userId = userDetails.id
    toggleNested()
    console.log(userId);
  }
  const confirmDeactivate = (userId) => {
    userId = userDetails.id
    toggleNested()
    console.log(userId);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size={size}>
      {/* <ModalHeader toggle={toggle}>User Profile</ModalHeader> */}
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
          <div><Button color='danger' onClick={confirmDeactivate}>Deactivate</Button></div>
        ) : (
          <div><Button color='success' onClick={confirmActivate}>Activate</Button></div>
        )}

        <Modal
          isOpen={nestedModal}
          toggle={toggleNested}
          onClosed={closeAll ? toggle : undefined}
        >
          <ModalHeader className='text-danger'>Caution!</ModalHeader>
          <ModalBody className='text-danger'>By clicking "Confirm" you will lock this user out of their account!</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleNested}>
              Cancel
            </Button>{' '}
            <Button color="danger" onClick={toggleAll}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
