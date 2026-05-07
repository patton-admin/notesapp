import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
import StandardDataGrid from "../table/StandardDataGrid.jsx";
// import { recruiterHeaders } from "../table/utils/recruiterHeaders.jsx";
import { debounce } from "lodash";
import { getAllRecruiter, getRecActivityByDateRange } from "../../api/api.jsx";
import { CircularProgress, createTheme, Stack, ThemeProvider, Box, Alert, AlertTitle, Dialog, DialogContent, InputLabel, OutlinedInput, Paper, Select, FormControl, Menu, MenuItem, Button } from "@mui/material";
import axios from "axios";


const theme = createTheme({
    typography: {
        fontFamily: 'poppins', fontSize: 14,
    },
});

const monthList = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12'
}

const currentYear = new Date().getFullYear();

const Dashboard = ({ user, role }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    // const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isLoading, setIsLoading] = useState(false);
    const [scoreCardData, setScoreCardData] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedRecruiter, setSelectedRecruiter] = useState(user);
    const [dropdownOptions, setDropdownOptions] = useState([])
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
        // if (role === 'super-admin') {
        getRecruiters();
        // fetchRecruiterByDateRange({})
        // }
    }, []);

    useEffect(() => {
        console.log("Rows have changed:", rows);
    }, [rows]);



    const handleFilter = async (e) => {
        console.log("Form submitted");
        e.preventDefault();
        console.log("Selected Recruiter:", selectedRecruiter, "Month:", selectedMonth, "Year:", selectedYear);
        if (selectedRecruiter && selectedYear && !selectedMonth) {
            await fetchRecruiterByYear({ recruiterName: selectedRecruiter, year: selectedYear });
        } else if (selectedRecruiter && selectedYear && selectedMonth) {
            await fetchRecruiterByDateRange({ recruiterName: selectedRecruiter, year: selectedYear, month: selectedMonth });
        } else if (!selectedRecruiter && selectedYear && selectedMonth) {
            await fetchAllRecruiterByYearandMonth({ year: selectedYear, month: selectedMonth });
            // } else if (!selectedRecruiter && selectedYear && !selectedMonth ) {
            //     await fetchTeamByYear({ team: selectedTeam, year: selectedYear });
            // } else if (!selectedRecruiter && selectedYear && selectedMonth && selectedTeam) {
            //     await fetchTeamByYearAndMonth({ team: selectedTeam, year: selectedYear, month: selectedMonth });
        }
        else {
            setAlertVisible(true);
            // <Alert variant="outlined" severity="error" onClose={() => {}}>
            //     <h5>Wrong Combination</h5>
            //     Possible combinations are:
            //     <ul>
            //         <li>Recruiter + Year + Month: Displays the record of the selected recruiter for the specified month and year.</li>
            //         <li>Recruiter + Year: Displays the complete record of the selected recruiter for the specified year. </li>
            //         <li>Year + Month: Will populate all the recruiters record for the selected month and year.</li>
            //     </ul>
            // </Alert>

        }
    };


    const getRecruiters = async () => {
        try {
            const dropdowns = await getAllRecruiter();
            console.log('dropdowns from getRecruiters...', dropdowns);
            if (dropdowns && dropdowns.length > 0) {
                setSelectedRecruiter(dropdowns[0].key);
                setDropdownOptions(dropdowns);
            }
        } catch (error) {
            console.error("Error fetching recruiters info:", error);
        }
    }

    const monthUtil = (monthName) => {
        const isString = monthName && typeof monthName === 'string' && isNaN(monthName);
        return isString ? monthList[monthName] : Object.keys(monthList).find(key => monthList[key] === `${monthName}`);;
    };

    const fetchRecruiterByDateRange = async ({ recruiterName, month, year }) => {
        try {
            setIsLoading(true);
            const monthNum = monthUtil(month);
            const response = await axios.get(
                `https://0yptiyr9xe.execute-api.us-east-1.amazonaws.com/dev/score/recruiter/${encodeURIComponent(recruiterName)}/range?startMonth=${monthNum}&endMonth=${monthNum}&year=${year}`
            );
            if (response && response.status === 200) {
                const payload = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                const { data } = payload;
                const formattedData = data.map(entry => {
                    const monthName = monthUtil(entry.month);
                    return {
                        id: entry.id || `${entry.recruiterName}-${entry.year}-${entry.month}`,
                        recruiterName: entry.recruiterName,
                        team: entry.team,
                        month: monthName,
                        year: entry.year,
                        timestamp: entry.timestamp,
                        weeklyData: entry.weeklyData
                    };
                });
                setRows(formattedData.map((e, index) => ({ ...e, id: index + 1 })));
            }
        } catch (error) {
            console.error("API call failed. Using mock data.", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const fetchAllRecruiterByYearandMonth = async ({ year, month }) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://0yptiyr9xe.execute-api.us-east-1.amazonaws.com/dev/score/month/${year}/${monthUtil(month)}`
            );
            if (response && response.status === 200) {
                const payload = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                const { data } = payload;
                const formattedData = data.map(entry => {
                    const monthName = monthUtil(entry.month);
                    return {
                        id: entry.id || `${entry.recruiterName}-${entry.year}-${entry.month}`,
                        recruiterName: entry.recruiterName,
                        team: entry.team,
                        month: monthName,
                        year: entry.year,
                        timestamp: entry.timestamp,
                        weeklyData: entry.weeklyData
                    };
                });
                setRows(formattedData.map((e, index) => ({ ...e, id: index + 1 })));
            }
        } catch (error) {
            console.error("API call failed. Using mock data.", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const fetchRecruiterByYear = async ({ recruiterName, year }) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://0yptiyr9xe.execute-api.us-east-1.amazonaws.com/dev/score/recruiter/${encodeURIComponent(recruiterName)}/range?startMonth=01&endMonth=12&year=${year}`
            );
            if (response && response.status === 200) {
                const payload = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                const { data } = payload;
                const formattedData = data.map(entry => {
                    const monthName = monthUtil(entry.month);
                    return {
                        id: entry.id || `${entry.recruiterName}-${entry.year}-${entry.month}`,
                        recruiterName: entry.recruiterName,
                        team: entry.team,
                        month: monthName,
                        year: entry.year,
                        timestamp: entry.timestamp,
                        weeklyData: entry.weeklyData
                    };
                });
                setRows(formattedData.map((e, index) => ({ ...e, id: index + 1 })));
            }
        } catch (error) {
            console.error("API call failed. Using mock data.", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const fetchTeamByYear = async ({ team, year }) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                ` https://0yptiyr9xe.execute-api.us-east-1.amazonaws.com/dev/score/team/${team}/year/${year}`
            );
            if (response && response.status === 200) {
                const { data } = response.data;
                const formattedData = data.map(entry => {
                    const monthName = monthUtil(entry.month);
                    return {
                        id: entry.id || `${entry.recruiterName}-${entry.year}-${entry.month}`,
                        recruiterName: entry.recruiterName,
                        team: entry.team,
                        month: monthName,
                        year: entry.year,
                        timestamp: entry.timestamp,
                        weeklyData: entry.weeklyData
                    };
                });
                setRows(formattedData.map((e, index) => ({ ...e, id: index + 1 })));
            }
        } catch (error) {
            console.error("API call failed. Using mock data.", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const fetchTeamByYearAndMonth = async ({ team, year, month }) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                ` https://0yptiyr9xe.execute-api.us-east-1.amazonaws.com/dev/score/team/${team}/year/${year}`
            );
            if (response && response.status === 200) {
                const { data } = response.data;
                const formattedData = data.map(entry => {
                    const monthName = monthUtil(entry.month);
                    return {
                        id: entry.id || `${entry.recruiterName}-${entry.year}-${entry.month}`,
                        recruiterName: entry.recruiterName,
                        team: entry.team,
                        month: monthName,
                        year: entry.year,
                        timestamp: entry.timestamp,
                        weeklyData: entry.weeklyData
                    };
                });
                setRows(formattedData.map((e, index) => ({ ...e, id: index + 1 })));
            }
        } catch (error) {
            console.error("API call failed. Using mock data.", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const setSelectedRows = (newSelection) => {
        console.log("Selected Rows:", newSelection);
    }

    const renderTable = () => (
        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '900px' }}>
                <thead>
                    <tr style={{ border: '1px solid #ddd', backgroundColor: '#ddd', }} >
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '5%', fontWeight: '550', borderRight: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '10%', fontWeight: '550', borderRight: '1px solid #ddd' }}>Recruiter Name</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '10%', fontWeight: 'bold' }}>Team</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '10%', fontWeight: '550', borderRight: '1px solid #ddd' }}>Month</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '60%', fontWeight: '550', borderRight: '1px solid #ddd' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr' }}>
                                <span>Week</span>
                                <span>Submitted Interviews</span>
                                <span>Achieved Interviews</span>
                                <span>Comments</span>
                            </div>
                        </th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '10%', fontWeight: '550' }}>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} style={{ borderBottom: '1px solid #eee', backgroundColor: row.id % 2 === 0 ? '#eee' : 'white' }}>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}>{row.id}</td>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}>{row.recruiterName}</td>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', }}>{row.team}</td>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}>{row.month}</td>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}>
                                {row.weeklyData.map((week, weekIndex) => (
                                    <div key={weekIndex} style={{
                                        fontSize: '.85rem',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr 2fr',
                                        padding: '5px',
                                        borderBottom: weekIndex < row.weeklyData.length - 1 ? '1px solid #ddd' : 'none',
                                    }}>
                                        <span style={{ borderRight: '1px solid #ddd' }}>{`Week ${weekIndex + 1}`}</span>
                                        <span style={{ borderRight: '1px solid #ddd', fontSize: '.75rem' }}>{week.submittedInterviews}</span>
                                        <span style={{ borderRight: '1px solid #ddd', fontSize: '.75rem' }}>{week.achievedInterviews}</span>
                                        <span
                                            title={week.comments}
                                            style={{
                                                display: 'block',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                cursor: 'pointer',
                                                position: 'relative',
                                            }}
                                        >
                                            {week.comments || '-'}
                                        </span>
                                    </div>
                                ))}
                            </td>
                            <td style={{ padding: '12px 8px' }}>{row.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

    return (<ThemeProvider theme={theme}>
        {/* {role === 'super-admin' && */}
        <div>
            <div style={{ textAlign: 'left' }}>
                {alertVisible && (
                    <Dialog open={open}>
                        <DialogContent>
                            <Alert severity="error" onClose={() => setAlertVisible(false)} >
                                <AlertTitle>Wrong Combination</AlertTitle>
                                Possible combinations:
                                <ul style={{ textAlign: 'left' }}>
                                    <li><strong>Recruiter + Year + Month:</strong> Displays the record of the selected recruiter for the specified month and year.</li>
                                    <li><strong>Recruiter + Year:</strong> Displays the complete record of the selected recruiter for the specified year.</li>
                                    <li><strong>Year + Month:</strong> Displays all recruiters' records for the selected month and year.</li>
                                </ul>
                            </Alert>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            <Form style={{ marginBottom: "16px", display: "flex", gap: "16px", alignItems: "end" }}
                onSubmit={handleFilter}>
                <Form.Group>
                    <FormControl sx={{ m: 1, Width: '10rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', paddingTop: '10px', fontWeight: '550' }}>
                            {/* <Form.Label>Recruiter:</Form.Label> */}
                            <InputLabel id='recruiter-select-label'>Recruiter</InputLabel>
                            <Select
                                labelId='recruiter-select-label'
                                id="recruiter-select"
                                value={selectedRecruiter}
                                onChange={(e) => setSelectedRecruiter(e.target.value)}
                                // input={<OutlinedInput label="Recruiter" />}
                                label='Recruiter'
                                sx={{ width: '10rem' }}
                            >
                                <MenuItem value="">None</MenuItem>
                                {dropdownOptions.map((rec) => (<MenuItem key={rec.key} value={rec.value}>
                                    {rec.key}
                                </MenuItem>))}
                            </Select>
                        </div>
                    </FormControl>
                </Form.Group>

                {/* <Form.Group>
                    <FormControl sx={{ m: 1, Width: '10rem' }}>
                        <InputLabel id='year-select-label'>Team</InputLabel>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', paddingTop: '10px', fontWeight: '550' }}>
                            <Select
                                value={selectedTeam}
                                onChange={e => setSelectedTeam(e.target.value)}
                                labelId='team-select-label'
                                id="team-select"
                                label='Team'
                                sx={{ width: '10rem' }}
                            >
                                {["Team 1", "Team 2", "Team 3"].map(team => (
                                    <MenuItem key={team} value={team}>{team}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </FormControl>
                </Form.Group> */}

                <Form.Group>
                    <FormControl sx={{ m: 1, Width: '10rem' }} required>
                        <InputLabel id='year-select-label'>Year</InputLabel>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', paddingTop: '10px', fontWeight: '550' }}>
                            <Select
                                value={selectedYear}
                                onChange={e => setSelectedYear(e.target.value)}
                                labelId='year-select-label'
                                id="year-select"
                                label='Year'
                                sx={{ width: '10rem' }}
                            >
                                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - 15 + i).map(year => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </FormControl>
                </Form.Group>
                <Form.Group>
                    <FormControl sx={{ m: 1, Width: '10rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', paddingTop: '10px', fontWeight: '550' }}>
                            <InputLabel id='month-select-label'>Month</InputLabel>
                            <Select
                                value={selectedMonth}
                                onChange={e => setSelectedMonth(e.target.value)}
                                labelId='month-select-label'
                                id="month-select"
                                label='Month'
                                sx={{ width: '10rem' }}
                            >
                                <MenuItem value=''>None</MenuItem>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                                    <MenuItem key={month} value={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </FormControl>
                </Form.Group>
                <Button variant="contained" type="submit" size="large" sx={{ height: '40px', marginBottom: '15px', marginLeft: '10px' }}>
                    Submit
                </Button>
            </Form>
            {/* <div>
                {isLoading ? (<CircularProgress />) : (<StandardDataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    onRowSelectionChange={(newSelection) => {
                        setSelectedRows(newSelection);
                    }}
                    loading={isLoading}
                />)}
            </div> */}
            <Box
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'auto',
                }}
            >

                {isLoading ? (
                    <CircularProgress />
                ) : (rows.length === 0 ? (
                    <Alert sx={{ p: 2, marginTop: 10 }} severity="info">
                        Select the combinations.
                    </Alert>
                ) : (
                    <Paper elevation={6} sx={{
                        p: 1,
                        borderRadius: '8px',
                    }} >
                        {renderTable()}
                    </Paper>
                )
                )}
            </Box>
        </div>
        {/* } */}
    </ThemeProvider >);
};

export default Dashboard;