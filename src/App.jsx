import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import './App.css';
import Footer from "./components/Footer.jsx";
import { getAllRecruiter } from "./api/api.jsx";
import Header from "./components/Header.jsx";
import { ScoreCardPage } from "./components/scoreCard/ScoreCard.jsx";
import Login from "./components/login/Login.jsx";
import { useSelector } from "react-redux";
import { userLogout } from "./actions/login.js";
import Home from "./components/Home.jsx";
import Dashboard from "./components/scoreCard/Dashboard.jsx";
import JobOrdersPage from './components/JobOrders/jobordersPage.jsx';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const theme = createTheme({
    palette: {
        background: {
            default: '#181717'
        }
    }
});


const App = (props) => {
    const isLoggedIn = useSelector((state) => state.login.role);
    const user = useSelector((state) => state.login.firstName) + "_" + useSelector((state) => state.login.lastName);
    const [recruiterName, setRecruiterName] = useState(user);
    const [state, setState] = useState({
        loading: true,
        apiData: null,
        recruiter: [],
        isLoggedIn: true,
    });

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(userLogout());
        // localStorage.removeItem("token");
        console.log('Logging out...')
        // navigate("/");
    };

    useEffect(() => {
        fetchRecruitersInfo();
    }, []);

    const fetchRecruitersInfo = async (user) => {
        try {
            console.log("Fetching recruiters info...", user);
            const getRecruitersInfo = await getAllRecruiter({ recruiterName: user });
            if (getRecruitersInfo?.status === 200) {
                const { data } = getRecruitersInfo.data;
                setState(prev => ({
                    ...prev,
                    recruiter: data ? data.map((e, index) => ({ ...e, id: index + 1 })) : []
                }));
            }
        } catch (error) {
            console.error("Error fetching recruiters info:", error);
        }
    };

    useEffect(() => {
        setState(prev => ({ ...prev, isLoggedIn: !!isLoggedIn }));
    }, [isLoggedIn]);

    useEffect(() => {
        if (user) {
            fetchRecruitersInfo(user);
            setRecruiterName(user);
        }
    }, [user]);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    {state.isLoggedIn ? (
                        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            {user && <Header user={recruiterName} role={isLoggedIn} handleLogout={handleLogout} />}
                            <main style={{ flex: 1, padding: '20px' }}>
                                <Routes>
                                    <Route path="/home" element={<Home user={user} role={isLoggedIn} />} />
                                    <Route path="/scorecard" element={<ScoreCardPage state={state} user={recruiterName} role={isLoggedIn} />} />
                                    <Route path="/dashboard" element={<Dashboard state={state} user={recruiterName} role={isLoggedIn} />} />
                                    <Route path="/jobOrders" element={<JobOrdersPage state={state} user={recruiterName} role={isLoggedIn} />} />
                                    <Route path="/globalBucket" element={<div>Score Card Page</div>} />
                                    <Route path="/support" element={<div>Support Page</div>} />
                                    <Route path="/help" element={<div>Help Page</div>} />
                                    <Route path="/user" element={<div>User Profile Page</div>} />
                                    <Route path="*" element={<Navigate to="/home" />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    ) : (
                        <Routes>
                            <Route path="*" element={<Login />} />
                        </Routes>
                    )}
                </div>
            </BrowserRouter>
        </ThemeProvider >
    );

}


export default App;