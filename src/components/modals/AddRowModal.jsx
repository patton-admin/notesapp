import React from 'react';
import { Modal, Container } from 'react-bootstrap';
import AddRowForm from './AddRowForm.jsx'; // Import the form component

const AddRowModal = ({ isOpen, onSubmit, handleFormSubmit, onClose, isModalOpen, formData, setIsModalOpen }) => {
    return (
        <Modal show={isOpen} onHide={onClose} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Add New ScoreCard</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <AddRowForm
                        row={formData}
                        // onSubmit={(values) => {
                        //     onSubmit(values);
                        //     onClose(); // Close the modal after submission
                        // }}
                        onSubmit={onSubmit}
                        onClose={onClose}

                    />
                </Container>
            </Modal.Body>
        </Modal>
    );
};



export default AddRowModal;