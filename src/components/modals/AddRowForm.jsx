import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Row, Col } from 'react-bootstrap';
import { PhoneEnabled } from '@mui/icons-material';
// import './../../App.css';

const validationSchema = Yup.object().shape({
    team: Yup.string().required('Team is required'),
    month: Yup.string().required('Month is required'),
    year: Yup.number().required('Year is required').min(2000, 'Year must be after 2000'),
    weeklyData: Yup.array().of(
        Yup.object().shape({
            submittedInterviews: Yup.number()
                .min(0, 'Cannot be negative')
                .typeError('Must be a number'),
            achievedInterviews: Yup.number()
                .min(0, 'Cannot be negative')
                .typeError('Must be a number'),
            comments: Yup.string()
                .max(500, 'Comments cannot exceed 500 characters'),
        })
    ).required('Weekly data is required').min(1, 'At least one week is required'),
});

const AddRowForm = ({ formData, onSubmit, onClose, row }) => {
    // const initialValues = formData || {
    //     recruiterName: '',
    //     month: '',
    //     year: '',
    //     timestamp: '',
    //     weeklyData: [
    //         { achievedInterviews: '', comments: '' },
    //         { achievedInterviews: '', comments: '' },
    //         { achievedInterviews: '', comments: '' },
    //         { achievedInterviews: '', comments: '' },
    //         { achievedInterviews: '', comments: '' },
    //     ]
    // };
    const currentYear = new Date().getFullYear();
    const initialValues = row || {
        recruiterName: '',
        team: '',
        month: '',
        year: currentYear,
        weeklyData: [
            { submittedInterviews: '', achievedInterviews: '', comments: '' },
            { submittedInterviews: '', achievedInterviews: '', comments: '' },
            { submittedInterviews: '', achievedInterviews: '', comments: '' },
            { submittedInterviews: '', achievedInterviews: '', comments: '' },
            { submittedInterviews: '', achievedInterviews: '', comments: '' },
        ],
    };

    const years = [];
    for (let i = currentYear - 15; i <= currentYear + 15; i++) {
        years.push(i.toString());
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleSubmit = (values, { resetForm }) => {
        console.log('Form submitted with values:', values);
        console.log('Transformed Values:', values);
        onSubmit(values);
        resetForm();
        onClose();
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
                        <Col md={4}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Select
                                        name="team"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.team}
                                        isInvalid={touched.month && !!errors.team}
                                    >
                                        <option value="">Select the Team</option>
                                        {['Team 1', 'Team 2', 'Team 3'].map((team) => (
                                            <option key={team} value={team}>
                                                {team}
                                            </option>
                                        ))}
                                    </BootstrapForm.Select>
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.month}
                                    </BootstrapForm.Control.Feedback>
                                    <label htmlFor="team">Team</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                        <Col md={4}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Select
                                        name="month"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.month}
                                        isInvalid={touched.month && !!errors.month}
                                    >
                                        <option value="">Select a Month</option>
                                        {months.map((month) => (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                    </BootstrapForm.Select>
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.month}
                                    </BootstrapForm.Control.Feedback>
                                    <label htmlFor="month">Month</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                        <Col md={4}>
                            <BootstrapForm.Group>
                                <div className="form-floating mb-3">
                                    <BootstrapForm.Select
                                        name="year"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.year}
                                        isInvalid={touched.year && !!errors.year}
                                    >
                                        <option value="">Select a Year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </BootstrapForm.Select>
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.year}
                                    </BootstrapForm.Control.Feedback>
                                    <label htmlFor="year">Year</label>
                                </div>
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3 d-none d-md-flex">
                        <Col md={2}>
                            <div className="text-muted fw-bold">Week</div>
                        </Col>
                        <Col md={2}>
                            <div className="text-muted fw-bold">Sub Int</div>
                        </Col>
                        <Col md={2}>
                            <div className="text-muted fw-bold">Ach Int</div>
                        </Col>
                        <Col md={6}>
                            <div className="text-muted fw-bold">Comments</div>
                        </Col>
                    </Row>
                    {[1, 2, 3, 4, 5].map((week) => (
                        <Row className="mb-3" key={week}>
                            <Col xs={12} md={2}>
                                <BootstrapForm.Label className="d- align-items-center h-100">
                                    {`${week}`}
                                </BootstrapForm.Label>
                            </Col>
                            <Col xs={12} md={2}>
                                <BootstrapForm.Group controlId={`submitted-interviews-week-${week}`}>
                                    <BootstrapForm.Control
                                        type="number"
                                        name={`weeklyData[${week - 1}].submittedInterviews`}
                                        onChange={handleChange}
                                        className="no-spinners"
                                        onBlur={handleBlur}
                                        value={values.weeklyData?.[week - 1]?.submittedInterviews}
                                        isInvalid={touched.weeklyData?.[week - 1]?.submittedInterviews && !!errors.weeklyData?.[week - 1]?.submittedInterviews}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.weeklyData?.[week - 1]?.submittedInterviews}
                                    </BootstrapForm.Control.Feedback>
                                </BootstrapForm.Group>
                            </Col>
                            <Col xs={12} md={2}>
                                <BootstrapForm.Group controlId={`achieved-interviews-week-${week}`}>
                                    <BootstrapForm.Control
                                        type="number"
                                        name={`weeklyData[${week - 1}].achievedInterviews`}
                                        onChange={handleChange}
                                        className="no-spinners"
                                        onBlur={handleBlur}
                                        value={values.weeklyData?.[week - 1]?.achievedInterviews}
                                        isInvalid={touched.weeklyData?.[week - 1]?.achievedInterviews && !!errors.weeklyData?.[week - 1]?.achievedInterviews}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.weeklyData?.[week - 1]?.achievedInterviews}
                                    </BootstrapForm.Control.Feedback>
                                </BootstrapForm.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <BootstrapForm.Group controlId={`comments-week-${week}`}>
                                    <BootstrapForm.Control
                                        as="textarea"
                                        rows={1}
                                        name={`weeklyData[${week - 1}].comments`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.weeklyData?.[week - 1]?.comments}
                                        isInvalid={touched.weeklyData?.[week - 1]?.comments && !!errors.weeklyData?.[week - 1]?.comments}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid">
                                        {errors.weeklyData?.[week - 1]?.comments}
                                    </BootstrapForm.Control.Feedback>
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                    ))}


                    <Row className="mb-3">
                        <Button type="submit" variant="primary">
                            {row ? 'Update' : 'Submit'}
                        </Button>
                    </Row>
                </Form>
            )
            }
        </Formik >
    );
};

export default AddRowForm;