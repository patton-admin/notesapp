import {ThemeProvider, createTheme, Button, Stack, Box} from '@mui/material'
import {useCallback, useEffect, useMemo, useState} from 'react';
import {CircularProgress} from '@mui/material';
import {debounce} from 'lodash';

import AddRowModal from "../modals/AddRowModal.jsx";
import {addScoreCard, getAllCandidates, getAllRecruiter} from "../../api/api.jsx";
import StandardDataGrid from "../table/StandardDataGrid.jsx";
import {recruiterHeaders} from "../table/utils/recruiterHeaders.jsx";

const theme = createTheme({
    typography: {
        fontFamily: 'Garamond', fontSize: 14,
    },
});

const ScoreCardDetails = ({recruiter, user, role}) => {
    const [rows, setRows] = useState(recruiter);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({user_createdby: '', user_loginid: ''});
    const [selectedRecruiter, setSelectedRecruiter] = useState(user);
    const [dropdownOptions, setDropdownOptions] = useState([]);

    const columns = useMemo(() => [...recruiterHeaders], []);

    useEffect(() => {
        if (selectedRecruiter) {
            fetchRecruitersInfo(selectedRecruiter);
        }
    }, [selectedRecruiter]);

    useEffect(() => {
        if (role === 'super-admin') {
            getRecruiters();
        }
    }, [])

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

    const fetchRecruitersInfo = useCallback(debounce(async (recruiterName) => {
        try {
            setIsLoading(true);
            const getRecruitersInfo = await getAllCandidates({recruiterName});
            if (getRecruitersInfo?.status === 200) {
                const {data} = getRecruitersInfo.data;
                setRows(data.map((e, index) => ({...e, id: index + 1})));
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching recruiters info:", error);
        }
    }, 300), []);

    const handleAddRow = () => {
        setIsModalOpen(true);
    };

    const handleDeleteRows = () => {
        const updatedRows = rows.filter(row => !selectedRows.includes(row.id))
        setRows(updatedRows)
        setSelectedRows([])
    }

    const handleFormSubmit = async (request) => {
        console.log('Form submitted:', request);
        const newId = Math.max(...rows.map(row => row.id)) + 1;
        const newRow = {
            id: newId,
            recruiterName: user,
            team: request.team,
            achievedInterviews: request.achievedInterviews,
            expectedInterviews: request.expectedInterviews,
            lead: request.lead,
            comments: request.comments,
            timestamp: new Date().toLocaleString(),
            month: String(request.month).padStart(2, '0'),
            year: request.year,
            day: String(request.day).padStart(2, '0'),
        };

        try {
            const isAdded = await addScoreCard(newRow);
            if (isAdded?.data?.statusCode === 201) {
                await fetchRecruitersInfo(selectedRecruiter);
            } else {
                console.error("Failed to add score card");
            }
        } catch (error) {
            console.error("Error adding score card:", error);
        } finally {
            setIsModalOpen(false);
            setFormData({user_createdby: '', user_loginid: ''});
        }
    };

    return (<ThemeProvider theme={theme}>
            {<Box
                sx={{
                    height: 'calc(100vh - 200px)',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    gap: 2, // Add spacing between elements
                }}
            >
                <Stack spacing={2} sx={{width: '100%'}}>
                    {role === 'super-admin' && (<Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{
                                justifyContent: 'flex-start', // Align dropdown and label
                                gap: 1,
                            }}
                        >
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
                        </Stack>)}

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: 'flex-start', // Align buttons to the left
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleAddRow}
                            sx={{
                                bgcolor: 'primary.main', textTransform: 'none', // Avoid uppercase text
                                padding: '8px 16px',
                            }}
                        >
                            Add Score Card
                        </Button>
                        {role === 'super-admin' ? <Button
                            variant="contained"
                            onClick={handleDeleteRows}
                            disabled={selectedRows.length === 0}
                            sx={{
                                bgcolor: 'error.main', textTransform: 'none', padding: '8px 16px',
                            }}
                        >
                            Delete Selected Score Card
                        </Button> : ''}
                    </Stack>

                    <Box
                        sx={{
                            flexGrow: 1,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'auto', // Ensure table scrolls on smaller screens
                        }}
                    >
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
                    </Box>
                    {isModalOpen && (<div className="modal">
                            <AddRowModal
                                isOpen={isModalOpen}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={handleFormSubmit}
                                onClose={() => setIsModalOpen(false)}
                            />
                        </div>)}
                </Stack>
            </Box>}
        </ThemeProvider>)
}

export default ScoreCardDetails