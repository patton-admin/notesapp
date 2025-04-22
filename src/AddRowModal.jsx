import React from 'react';
import styles from './styles/AddRowModel.css';
import {Box, Modal} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddRowModal = ({ isOpen, formData, setFormData, onSubmit, onClose }) => {
    if (!isOpen) return null;
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
            <div className={styles.modalContent}>
                <h2 style={{backgroundColor: 'grey'}}>Add New Row</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Created By:
                            <input
                                type="text"
                                value={formData.user_createdby}
                                onChange={(e) => setFormData({ ...formData, user_createdby: e.target.value })}
                                required
                                style={{ marginLeft: '10px', padding: '5px', width: '100%' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Login ID:
                            <input
                                type="text"
                                value={formData.user_loginid}
                                onChange={(e) => setFormData({ ...formData, user_loginid: e.target.value })}
                                required
                                style={{ marginLeft: '10px', padding: '5px', width: '100%' }}
                            />
                        </label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="submit" className={`${styles.modalButton} ${styles.submitButton}`}>Submit</button>
                        <button type="button" onClick={onClose} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancel</button>
                    </div>
                </form>
            </div>
            </Box>
        </Modal>
    );
}

export default AddRowModal;