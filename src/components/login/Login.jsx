import React from "react";
import {Tooltip} from "@mui/material";
import {Form, Button, Alert} from "react-bootstrap";
import {Formik} from "formik";
import {connect} from "react-redux";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {validLogin} from "../../actions/login.js";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const Login = (props) => {
    const {loginFailed} = props;
    const initialValues = {
        username: "",
        password: "",
    };

    const submit = (data) => {
        const {username, password} = data;
        if (username) {
            props.dispatch(
                validLogin({username: username, password: password})
            );
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f8f9fa",
                paddingTop: "5px", // Add padding to reduce space at the top
                boxSizing: "border-box", // Ensure padding is included in the layout
            }}
        >
            <div
                style={{
                    width: "300px",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        // Call the custom submit method
                        submit(values);
                        resetForm({ values: initialValues });
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <h3 style={{ textAlign: "center" }}>Patton Score Card</h3>
                            <p style={{ textAlign: "center" }}>
                                <Tooltip title="Patton-Labs" placement="right">
                                    {/* Add your logo here */}
                                </Tooltip>
                            </p>

                            {loginFailed === true && (
                                <Alert variant="danger">
                                    Invalid Username/Password
                                </Alert>
                            )}

                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.username && !!errors.username}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.password && !!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" block>
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loginFailed: state.login.error,
    };
};

export default connect(mapStateToProps)(Login);