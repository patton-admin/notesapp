// import React from "react";
// import Alert from "@material-ui/lab/Alert";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, Tooltip, TextField } from "@material-ui/core";
// import { Formik, Form } from "formik";
// import { connect } from "react-redux";
// import PattonLabs from "./../../images/patton.png";
// import { createMuiTheme } from "@material-ui/core/styles";
// import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
// import "./../../styles/Login.css";
//
// const THEME = createMuiTheme({
//   palette: {
//     primary: {
//       light: "#757ce8",
//       main: "#3f50b5",
//       dark: "#002884",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "rgba(0, 38, 88, 0.91)",
//       main: "rgba(0, 38, 88, 0.91)",
//       // dark: "rgba(225, 110, 28, 0.91)",
//       contrastText: "#fff",
//     },
//   },
// });
//
// const Login = (props) => {
//   const { loginFailed, OnSubmit } = props;
//   const initialValues = {
//     // username: "panda@gmail.com",
//     // password: "panda001",
//     username: "",
//     password: "",
//     // username: "breme001@gmail.com",
//     // password: "breme001",
//     // username: "ng@gmail.com",
//     // password: "ng",
//     // username: "guru001@gmail.com",
//     // password: "guru001",
//     // username: "rang001@gmail.com",
//     // password: "rang001",
//     // username: "ramji001@gmail.com",
//     // password: "ramji001",
//   };
//
//   const submit = (data) => {
//     OnSubmit(data);
//   };
//
//   return (
//     <div>
//       <div className="align">
//         <div className="grid" style={{ paddingTop: "70px" }}>
//           <Formik
//             initialValues={initialValues}
//             onSubmit={(values, { resetForm }) => {
//               submit(values);
//               resetForm({ values: initialValues });
//             }}
//           >
//             {({ values, handleChange, handleBlur }) => (
//               <Form>
//                 <h3 className="patton-img">Patton Score Card</h3>
//                 <p className="patton-img">
//                   <Tooltip title="Patton-Labs" placement="right">
//                     <img
//                       src={PattonLabs}
//                       style={{
//                         height: "25%",
//                         width: "25%",
//                       }}
//                     />
//                   </Tooltip>
//                 </p>
//
//                 <p></p>
//                 <p></p>
//                 <p></p>
//                 <p></p>
//                 <p></p>
//
//                 {loginFailed === true && (
//                   <Alert severity="error" varient="outlined">
//                     Invalid Username/Password
//                   </Alert>
//                 )}
//
//                 <div className="form login">
//                   <div className="form__field">
//                     <label>
//                       <FontAwesomeIcon icon="user" />
//                       <span className="hidden">Username</span>
//                     </label>
//                     <input
//                       type="text"
//                       // autoComplete="off"
//                       name="username"
//                       className="form__input"
//                       placeholder="Username"
//                       required
//                       value={values.username}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     ></input>
//                   </div>
//
//                   <div className="form__field">
//                     <label>
//                       <FontAwesomeIcon icon="lock" />
//                       <span className="hidden">Password</span>
//                     </label>
//                     <input
//                       // autoComplete="off"
//                       id="login__password"
//                       type="password"
//                       name="password"
//                       className="form__input"
//                       placeholder="Password"
//                       required
//                       value={values.password}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     ></input>
//                   </div>
//
//                   <div className="form__field">
//                     <MuiThemeProvider theme={THEME}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="secondary"
//                         // color="#08AEEA"
//                         fullWidth
//                       >
//                         Login
//                       </Button>
//                     </MuiThemeProvider>
//                   </div>
//                 </div>
//                 {/* <pre> {JSON.stringify(values, null, 2)}</pre> */}
//               </Form>
//             )}
//           </Formik>
//           {/* <p className="text--center">Not a member? <a href="#">Forgot Password</a>
//                         </p> */}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// const mapStateToProps = (state) => {
//   return {
//     loginFailed: state.login.error,
//   };
// };
//
// export default connect(mapStateToProps)(Login);
