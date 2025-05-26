import React, {useCallback, useEffect, useMemo} from "react";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import StandardDataGrid from "../table/StandardDataGrid.jsx";
import {recruiterHeaders} from "../table/utils/recruiterHeaders.jsx";
import {debounce} from "lodash";
import {getAllCandidates, getAllRecruiter, getRecActivityByDateRange} from "../../api/api.jsx";
import {CircularProgress, createTheme, Stack, ThemeProvider} from "@mui/material";


const theme = createTheme({
    typography: {
        fontFamily: 'Garamond', fontSize: 14,
    },
});

const Dashboard = ({user, role}) => {
    const [tempStartDate, setTempStartDate] = useState("");
    const [tempEndDate, setTempEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [scoreCardData, setScoreCardData] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedRecruiter, setSelectedRecruiter] = useState(user);
    const [dropdownOptions, setDropdownOptions] = useState([]);

    const columns = useMemo(() => [...recruiterHeaders], []);

    useEffect(() => {
        if (role === 'super-admin') {
            getRecruiters();
        }
    }, []);

    useEffect(() => {
        console.log("Rows have changed:", rows);
    }, [rows]);

    const handleFilter = async (e) => {
        e.preventDefault();
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        console.log("Selected Recruiter:", selectedRecruiter, "Start Date:", tempStartDate, "End Date:", tempEndDate)
        await fetchRecruiterByDateRange({
            recruiterName: selectedRecruiter, startDate: tempStartDate, endDate: tempEndDate
        });
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

    const fetchRecruiterByDateRange = useCallback(debounce(async ({recruiterName, startDate, endDate}) => {
        try {
            setIsLoading(true);
            const getRecruitersInfo = await getRecActivityByDateRange({recruiterName, startDate, endDate});
            if (getRecruitersInfo?.statusCode === 200) {
                const {data} = getRecruitersInfo.body;
                console.log("Fetched Data:", data);
                setRows(data.map((e, index) => ({...e, id: index + 1})));
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching recruiters info:", error);
        }
    }, 300), []);

    const setSelectedRows = (newSelection) => {
        console.log("Selected Rows:", newSelection);
    }

    return (<ThemeProvider theme={theme}>
            {role === 'super-admin' && <div>
                <Form style={{marginBottom: "16px", display: "flex", gap: "16px", alignItems: "end"}}
                      onSubmit={handleFilter}>
                    <label
                        htmlFor="recruiter-select"
                        style={{
                            fontSize: '16px', fontWeight: 'bold', whiteSpace: 'nowrap', // Prevent label wrapping
                        }}
                    >
                        Select Recruiter:
                    </label>
                    <select
                        id="recruiter-select"
                        value={selectedRecruiter}
                        onChange={(e) => setSelectedRecruiter(e.target.value)}
                        style={{
                            padding: '8px',
                            fontSize: '14px',
                            zIndex: 1,
                            position: 'relative',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            minWidth: '200px', // Ensure consistent width
                        }}
                    >
                        {dropdownOptions.map((rec) => (<option key={rec.key} value={rec.value}>
                                {rec.key}
                            </option>))}
                    </select>
                    <Form.Group>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            paddingTop: '10px'
                        }}>
                            <Form.Label>Start Date:</Form.Label>
                            <Form.Control
                                type="date"
                                value={tempStartDate}
                                onChange={e => setTempStartDate(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            whiteSpace: 'nowrap',
                            paddingTop: '10px',
                            fontWeight: 'bold',
                        }}>
                            <Form.Label>End Date:</Form.Label>
                            <Form.Control
                                type="date"
                                value={tempEndDate}
                                onChange={e => setTempEndDate(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div>
                    {isLoading ? (<CircularProgress/>) : (<StandardDataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        onRowSelectionChange={(newSelection) => {
                            setSelectedRows(newSelection);
                        }}
                        loading={isLoading}
                    />)}
                </div>
            </div>}
        </ThemeProvider>);
};

export default Dashboard;