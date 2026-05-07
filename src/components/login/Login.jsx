import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert } from "@mui/material";
import { validLogin } from "../../actions/login.js";
import PattonLabs from "./patton.jpg";
import "./Login.css";

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1v2z" />
  </svg>
);

const Login = (props) => {
  const { loginFailed } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      props.dispatch(validLogin({ username, password }));
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      <div className="align">
        <div className="grid" style={{ paddingTop: "70px" }}>
          <form onSubmit={handleSubmit}>
            <h3 className="patton-img">Patton Score Card</h3>
            <p className="patton-img">
              <img
                src={PattonLabs}
                alt="Patton Labs"
                style={{ height: "25%", width: "25%" }}
              />
            </p>
            <p></p>
            <p></p>

            {loginFailed === true && (
              <Alert severity="error" variant="outlined" sx={{ mb: 1 }}>
                Invalid Username/Password
              </Alert>
            )}

            <div className="form login">
              <div className="form__field">
                <label>
                  <UserIcon />
                  <span className="hidden">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  className="form__input"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form__field">
                <label>
                  <LockIcon />
                  <span className="hidden">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form__input"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form__field">
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginFailed: state.login.error,
});

export default connect(mapStateToProps)(Login);
