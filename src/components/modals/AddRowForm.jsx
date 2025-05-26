import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Row, Col } from 'react-bootstrap';

const validationSchema = Yup.object().shape({
    expectedInterviews: Yup.number().required('Expected Interviews is required').min(1, 'Must be at least 1'),
    achievedInterviews: Yup.number().required('Achieved Interviews is required').min(0, 'Cannot be negative'),
    month: Yup.string().required('Month is required'),
    timestamp: Yup.date().required('Timestamp is required'),
    year: Yup.number().required('Year is required').min(2000, 'Year must be after 2000'),
    comments: Yup.string().required('Comments are required').max(500, 'Comments cannot exceed 500 characters'),
    team: Yup.string().required('Team is required'),
    day: Yup.string().required('Day is required'),
    lead: Yup.boolean().required('Lead is required'),
});

const AddRowForm = ({ onSubmit }) => {
    const initialValues = {
        expectedInterviews: '',
        achievedInterviews: '',
        month: '',
        timestamp: '',
        year: '',
        comments: '',
        recruiterName: '',
        team: '',
        day: '',
        lead: false,
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
        >
            {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                    <Row className="mb-3">
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Expected Interviews</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="number"
                                    name="expectedInterviews"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.expectedInterviews}
                                    isInvalid={touched.expectedInterviews && !!errors.expectedInterviews}
                                />
                                <BootstrapForm.Control.Feedback type="invalid">
                                    {errors.expectedInterviews}
                                </BootstrapForm.Control.Feedback>
                            </BootstrapForm.Group>
                        </Col>
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Achieved Interviews</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="number"
                                    name="achievedInterviews"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.achievedInterviews}
                                    isInvalid={touched.achievedInterviews && !!errors.achievedInterviews}
                                />
                                <BootstrapForm.Control.Feedback type="invalid">
                                    {errors.achievedInterviews}
                                </BootstrapForm.Control.Feedback>
                            </BootstrapForm.Group>
                        </Col>
                    </Row>

                    <Row className= "mb-3">
                        <Col md={4}>
                            <BootstrapForm.Group className="mb-3">
                                <BootstrapForm.Label>Timestamp</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="datetime-local"
                                    name="timestamp"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.timestamp}
                                    isInvalid={touched.timestamp && !!errors.timestamp}
                                />
                                <BootstrapForm.Control.Feedback type="invalid">
                                    {errors.timestamp}
                                </BootstrapForm.Control.Feedback>
                            </BootstrapForm.Group>
                        </Col>

                        <Col md={4}>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label>Month</BootstrapForm.Label>
                        <BootstrapForm.Control
                            type="text"
                            name="month"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.month}
                            isInvalid={touched.month && !!errors.month}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                            {errors.month}
                        </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                        </Col>

                <Col md={4}>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label>Year</BootstrapForm.Label>
                        <BootstrapForm.Control
                            type="number"
                            name="year"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.year}
                            isInvalid={touched.year && !!errors.year}
                        /><BootstrapForm.Control.Feedback type="invalid">
                            {errors.year}
                        </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                </Col>
                    </Row>

                    <Row className="mb-3">
                    <Col md={4}>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label>Team</BootstrapForm.Label>
                        <BootstrapForm.Control
                            type="text"
                            name="team"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.team}
                            isInvalid={touched.team && !!errors.team}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                            {errors.team}
                        </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                    </Col>
                    <Col md={4}>
                        <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label>Day</BootstrapForm.Label>
                        <BootstrapForm.Control
                            type="text"
                            name="day"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.day}
                            isInvalid={touched.day && !!errors.day}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                            {errors.day}
                        </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                    </Col>
                </Row>
                    <Row className="mb-3">
                        <BootstrapForm.Group className="mb-3">
                            <BootstrapForm.Label>Comments</BootstrapForm.Label>
                            <BootstrapForm.Control
                                as="textarea"
                                name="comments"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.comments}
                                isInvalid={touched.comments && !!errors.comments}
                            />
                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.comments}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>
                    </Row>
                    <Row className="mb-3">
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Check
                            type="checkbox"
                            label="Lead"
                            name="lead"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.lead}
                            isInvalid={touched.lead && !!errors.lead}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                            {errors.lead}
                        </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                    </Row>
                    <Row className="mb-3">
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

export default AddRowForm;