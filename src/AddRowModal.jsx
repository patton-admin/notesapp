import React from 'react';
import { Modal, Container } from 'react-bootstrap';
import AddRowForm from './AddRowForm'; // Import the form component

const AddRowModal = ({ isOpen, onSubmit, onClose }) => {
    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Row</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <AddRowForm
                        onSubmit={(values) => {
                            onSubmit(values);
                            onClose(); // Close the modal after submission
                        }}
                    />
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default AddRowModal;