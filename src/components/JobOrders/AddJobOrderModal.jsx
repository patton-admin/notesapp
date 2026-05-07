import React from 'react';
import { Modal, Container } from 'react-bootstrap';
import AddJobOrders from './AddJobOrder.jsx'; // Import the form component

const AddJobOrderModal = ({ isOpen, onSubmit, onClose, formData, selectedRecruiter }) => {
    return (
        <Modal show={isOpen} onHide={onClose} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Add New JobOrder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <AddJobOrders
                        row={formData}
                        defaultSubBy={selectedRecruiter}
                        onSubmit={onSubmit}
                        onClose={onClose}
                    />
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default AddJobOrderModal;