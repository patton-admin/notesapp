import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { userLogout } from "./../actions/login";
import Header from "./../components/Header";
// import Home from "./../components/Home";
// import Login from "../components/login/Login.jsx";
// import Help from "../components/support/Help.jsx";
// import Support from "./../components/support/Support";
import Footer from "./../components/Footer";
import ErBndry from "./../components/error/ErrorBoundry";
// import "./../styles/Footer.css";
// import Logout from "../components/login/Logout.jsx";
// import AlertDialogSlide from "../components/login/IdleModal.jsx";

export const history = createBrowserHistory();

export const AppRouters = (props) => {
    const { userIdleLogout, isLoggedIn } = props;

    const [timeOutDuration, setTimeOutDuration] = useState(300000);
    const [isVisible, setisVisible] = useState(false);
    const [isTimedOut, setIsTimeOut] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //to perform the smooth scrolling...
    const checkScrollTop = () => {
        if (!isVisible && window.pageYOffset > 400) {
            setisVisible(true);
        } else if (isVisible && window.pageYOffset <= 400) {
            setisVisible(false);
        }
    };

    window.addEventListener("scroll", checkScrollTop);

    const onAction = (e) => {
        setIsTimeOut(false);
    };

    const onActive = (e) => {
        setIsTimeOut(false);
    };

    let idleTimer = null;

    const onIdle = (e) => {
        console.log("user is idle", e);
        if (isLoggedIn && isTimedOut) {
            userIdleLogout();
            history.push("/");
            setShowModal(false);
        } else if (isLoggedIn) {
            setShowModal(true);
            idleTimer.reset();
            setIsTimeOut(true);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleLogout = () => {
        setShowModal(false);
        history.push("/");
        userIdleLogout();
    };

    return (
        <Router history={history}>
            <>
                {isLoggedIn && <Header user={props.user} handleLogout={handleLogout} />}
                <ErBndry>
                    <Routes>
                        {/*<Route path="/" component={<Login />} />*/}
                        {/*{isLoggedIn && <Route path="/home" component={<Home />} />}*/}
                        {/*{isLoggedIn && <Route path="/help" component={<Help />} />}*/}
                        {/*{isLoggedIn && <Route path="/support" component={<Support />} />}*/}
                        {/*{isLoggedIn && <Route path="*" component={<NotFound />} />}*/}
                    </Routes>
                </ErBndry>
                {isLoggedIn && (
                    <footer>
                        <Footer />
                    </footer>
                )}
            </>
        </Router>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login.loginSuccess,
        user: state.login.firstName,
        role: state.login.role,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userIdleLogout: () => {
            dispatch(userLogout());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouters);
