import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {ThemeProvider, createTheme, CssBaseline, CircularProgress} from '@mui/material';
import { useState, useEffect } from 'react';
import './App.css';
import Footer from "./components/Footer.jsx";
import { getAllCandidates } from "./api/api.jsx";
import Header from "./components/Header.jsx";
import {ScoreCardPage} from "./ScoreCard.jsx";
import Login from "./components/login/Login.jsx";
import {useSelector} from "react-redux";
import {userLogout} from "./actions/login.js";

const theme = createTheme({
    palette: {
        background: {
            default: '#181717'
        }
    }
});

const App = () => {
    const isLoggedIn = useSelector((state) => state.login.role);
    const [state, setState] = useState({
        loading: true,
        apiData: null,
        recruiter: [],
        isLoggedIn: false,
    });

    const handleLogout = () => {
        props.dispatch(userLogout());
        console.log('Logging out...');
    };

    useEffect(() => {
        const apiUrl = 'https://dssfrodna1.execute-api.us-east-1.amazonaws.com/test/v1-test';

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setState(prev => ({...prev, apiData: data[0], loading: false}));
            } catch (error) {
                console.error('Error fetching data:', error);
                setState(prev => ({...prev, loading: false}));
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        fetchRecruitersInfo();
    }, []);

    const fetchRecruitersInfo = async () => {
        try {
            const getRecruitersInfo = await getAllCandidates();
            if (getRecruitersInfo?.status === 200) {
                const {data} = getRecruitersInfo.data;
                setState(prev => ({
                    ...prev,
                    recruiter: data.map((e, index) => ({...e, id: index + 1}))
                }));
            }
        } catch (error) {
            console.error("Error fetching recruiters info:", error);
        }
    };

    useEffect(() => {
        setState(prev => ({ ...prev, isLoggedIn: !!isLoggedIn }));
    }, [isLoggedIn]);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    {state.isLoggedIn ? (
                        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            <Header user={state.apiData.user_loginid} handleLogout={handleLogout} />
                            <main style={{ flex: 1, padding: '20px' }}>
                                <Routes>
                                    <Route path="/scorecard" element={<ScoreCardPage state={state} refresh={fetchRecruitersInfo} />} />
                                    <Route path="/dashboard" element={<div>Dashboard Page</div>} />
                                    <Route path="/jobOrders" element={<div>Job Orders Page</div>} />
                                    <Route path="/globalBucket" element={<div>Score Card Page</div>} />
                                    <Route path="/support" element={<div>Support Page</div>} />
                                    <Route path="/help" element={<div>Help Page</div>} />
                                    <Route path="/user" element={<div>User Profile Page</div>} />
                                    <Route path="*" element={<Navigate to="/" />} />
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
        </ThemeProvider>
    );
}

export default App;