import {ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import {useState, useEffect} from 'react';
import './App.css';
import DataGridComponent from "./DataGridComponent.jsx";
import Footer from "./Footer.jsx";
import {getAllCandidates} from "./api/api.jsx";

const theme = createTheme({
    palette: {
        background: {
            default: '#181717'
        }
    }
});

const App = () => {
    const [state, setState] = useState({
        loading: true,
        apiData: null,
        recruiter: []
    });

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

        fetchRecruitersInfo();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="api-data">
                {state.loading ? (
                    <p>Loading...</p>
                ) : state.apiData ? (
                    <div style={{backgroundColor: '#1565c0'}}>
                        <h2>Patton Score Card</h2>
                        <p><strong>UserId:</strong> {state.apiData.user_createdby}</p>
                        <p><strong>Email:</strong> {state.apiData.user_loginid}</p>
                    </div>
                ) : (
                    <p>Error loading data.</p>
                )}
                {state.recruiter.length > 0 && <DataGridComponent recruiter={state.recruiter}/>}
                {/*<Footer/>*/}
            </div>
        </ThemeProvider>
    );
}

export default App
