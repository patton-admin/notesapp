import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Row, Col } from 'react-bootstrap';
import { PhoneEnabled } from '@mui/icons-material';
import './../../App.css';

const validationSchema = Yup.object().shape({
    orderName: Yup.string().required('Order Name is required'),
    orderDate: Yup.string().required('Order Date is required'),
    client: Yup.string().required('Client is required'),
    candidate: Yup.string().required('Candidate is required'),
    tSourced: Yup.string().required('T.Sourced is required'),
    status: Yup.string().required('Status is required'),
});

const AddJobOrders = ({ formData, onSubmit, onClose, row, defaultSubBy }) => {

    const initialValues = row || {
        orderName: '',
        orderDate: '',
        subDate: '',
        client: '',
        status: 'Active',
        tSourced: '',
        subBy: defaultSubBy || '',
        candidate: '',
        clientRecruiter: '',
        candidateStatus: '',
    };


    const handleSubmit = async (values, { resetForm }) => {
        console.log('Form submitted with values:', values);
        await onSubmit(values);
        resetForm();
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >
            {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>

                    <Row className="mb-3">
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="orderName"
                                        value={values.orderName}
                                        onChange={handleChange}
                                        placeholder="Order Name"
                                        onBlur={handleBlur}
                                        isInvalid={touched.orderName && !!errors.orderName}
                                    />
                                    <label htmlFor="orderName">Order Name</label>
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.orderName}
                                    </BootstrapForm.Control.Feedback>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="candidate"
                                        placeholder='Candidate'
                                        value={values.candidate}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="candidate">Candidate</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        type="date"
                                        name="orderDate"
                                        value={values.orderDate}
                                        placeholder='Order Date'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.orderDate && !!errors.orderDate}
                                    />
                                    <label htmlFor="orderDate">Order Date</label>
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.orderDate}
                                    </BootstrapForm.Control.Feedback>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        type="date"
                                        name="subDate"
                                        value={values.subDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Submission Date'
                                        isInvalid={touched.subDate && !!errors.subDate}
                                    />
                                    <label htmlFor="subDate">Submission Date</label>
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.subDate}
                                    </BootstrapForm.Control.Feedback>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="client"
                                        value={values.client}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Client'
                                    />
                                    <label htmlFor="client">Client</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Select
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        placeholder='Status'
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Hold">Hold</option>
                                        <option value="Closed">Closed</option>
                                    </BootstrapForm.Select>
                                    <label htmlFor="status">Status</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="tSourced"
                                        value={values.tSourced}
                                        onChange={handleChange}
                                        placeholder='T.Sourced'
                                    />
                                    <label htmlFor="tSourced">T.Sourced</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>

                        <Col md={4}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="subBy"
                                        value={values.subBy}
                                        onChange={handleChange}
                                        placeholder='Sub By'
                                    />
                                    <label htmlFor="subBy">Sub By</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                        <Col md={4}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="clientRecruiter"
                                        value={values.clientRecruiter}
                                        onChange={handleChange}
                                        placeholder='C.Recruiter'
                                    />
                                    <label htmlFor="clientRecruiter">C.Recruiter</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                    </Row>


                    <Row className="mb-3">
                        <Col md={12}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Control
                                        as="textarea"
                                        rows={2}
                                        name="candidateStatus"
                                        value={values.candidateStatus}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="candidateStatus">Candidate Status</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Button type="submit" variant="primary">
                            {row ? 'Update' : 'Submit'}
                        </Button>
                    </Row>
                </Form>
            )}
        </Formik>

    );
};

export default AddJobOrders;