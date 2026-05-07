import { ThemeProvider, createTheme, Button, Stack, Box, CircularProgress, Paper, Alert } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { mockRecruitersData, mockRecruiterList } from './Mockdata';
import AddRowModal from "../modals/AddRowModal.jsx";
import { addScoreCard, getRecruiterActivity } from "../../api/api.jsx";

const theme = createTheme({
    typography: {
        fontFamily: 'poppins',
        fontSize: 14,
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

const ScoreCardDetails = ({ recruiter, user }) => {
    const [rows, setRows] = useState(recruiter);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRecruiter, setSelectedRecruiter] = useState(user);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (selectedRecruiter) {
            fetchRecruitersInfo(selectedRecruiter);
        }
    }, [selectedRecruiter]);

    const fetchRecruitersInfo = useCallback(debounce(async (recruiterName) => {
        try {
            setIsLoading(true);
            const getRecruitersInfo = await getRecruiterActivity({ recruiterName });
            console.log('API Response for recruiter:', getRecruitersInfo);
            if (getRecruitersInfo && getRecruitersInfo.data) {
                const { data } = getRecruitersInfo;
                setRows(
                    data.map((e, index) => ({
                        ...e,
                        id: index + 1,
                        month: monthUtil(e.month),
                    }))
                );
            } else {
                console.error("Failed to fetch recruiter data. Using mock data.");
                const filteredData = mockRecruitersData.data.data.filter(
                    (rec) => rec.recruiterName === recruiterName
                );

                setRows(
                    filteredData.map((e, index) => ({
                        ...e,
                        id: index + 1,
                        month: monthUtil(e.month),
                    }))
                );
            }
        } catch (error) {
            console.error(
                "Error fetching recruiters info from API. Using mock data.",
                error
            );
            const filteredData = mockRecruitersData.data.data.filter(
                (rec) => rec.recruiterName === recruiterName
            );

            setRows(
                filteredData.map((e, index) => ({
                    ...e,
                    id: index + 1,
                    month: monthUtil(e.month),
                }))
            );
        } finally {
            setIsLoading(false);
        }
    }, 300), []);


    const handleAddRow = () => {
        setFormData(null);
        setIsModalOpen(true);
    };

    const handleUpdateRow = (rowData) => {
        setFormData(rowData);
        setIsModalOpen(true);
    };

    // const handleFormSubmit = async (newRowData) => {
    //     try {
    //         setIsLoading(true);
    //         await addScoreCard(newRowData);
    //         setIsModalOpen(false);
    //     } catch (error) {
    //         console.error('Error saving data:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleFormSubmit = async (formData) => {
        console.log('Form submitted:', formData);

        // Utility to convert month name to number (1-12)
        function getMonthNumber(monthName) {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const idx = months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
            return idx !== -1 ? `${idx + 1}` : null;
        }

        const newRow = {
            id: rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 1,
            recruiterName: selectedRecruiter,
            team: formData.team,
            month: getMonthNumber(formData.month), // convert to number
            year: formData.year,
            timestamp: new Date().toLocaleString(),
            weeklyData: formData.weeklyData.map((week) => ({
                submittedInterviews: week.submittedInterviews === '' ? '0' : week.submittedInterviews,
                achievedInterviews: week.achievedInterviews === '' ? '0' : week.achievedInterviews,
                comments: week.comments === '' ? '-' : week.comments,
            })),
        };
        console.log('Payload being sent to API:', newRow);

        try {
            const isAdded = await addScoreCard(newRow);
            console.log('API Response:', isAdded);
            if (isAdded?.status === 201) {
                setRows((prevRows) => [...prevRows, newRow]);
                await fetchRecruitersInfo(selectedRecruiter);
            } else {
                console.error("Failed to add score card");
            }
        } catch (error) {
            console.error("Error adding score card:", error);
        } finally {
            setIsModalOpen(false);
            setFormData(null);
        }
    };

    const handleFormUpdate = async (formData) => {
        console.log('Form submitted:', formData);

        // Utility to convert month name to number (1-12)
        function getMonthNumber(monthName) {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const idx = months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
            return idx !== -1 ? `${idx + 1}` : null;
        }

        const updatedRow = {
            id: formData.id,
            recruiterName: selectedRecruiter,
            team: formData.team,
            month: getMonthNumber(formData.month), // convert to number
            year: formData.year,
            timestamp: new Date().toLocaleString(),
            weeklyData: formData.weeklyData.map((week) => ({
                submittedInterviews: week.submittedInterviews === '' ? '0' : week.submittedInterviews,
                achievedInterviews: week.achievedInterviews === '' ? '0' : week.achievedInterviews,
                comments: week.comments === '' ? '-' : week.comments,
            })),
        };
        console.log('Payload being sent to API(Update):', updatedRow);

        try {
            const isUpdated = await UpdateScoreCard(updatedRow);
            console.log('API Response:', isAdded);
            if (isUpdated?.data?.statusCode === 201) {
                setRows((prevRows) =>
                    prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
                );
                // await fetchRecruitersInfo(selectedRecruiter);
            } else {
                console.error("Failed to update score card");
            }
        } catch (error) {
            console.error("Error updating score card:", error);
        } finally {
            setIsModalOpen(false);
            setFormData(null);
        }
    };

    const monthUtil = (monthNumber) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const numericMonth = parseInt(monthNumber, 10);
        if (numericMonth >= 1 && numericMonth <= 12) {
            return monthNames[numericMonth - 1];
        }
    }

    const renderTable = () => (
        <div style={{ overflowX: 'auto', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '900px' }}>
                <thead>
                    <tr style={{ border: '1px solid #ddd', backgroundColor: "#ddd", }} >
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '5%', fontWeight: 'bold' }}>ID</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '10%', fontWeight: 'bold' }}>Recruiter Name</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '10%', fontWeight: 'bold' }}>Team</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '10%', fontWeight: 'bold' }}>Month</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '65%', fontWeight: 'bold' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', textAlign: 'center' }}>
                                <span style={{ alignContent: 'center' }}>Week</span>
                                <span>Submitted Interviews</span>
                                <span>Achieved Interviews</span>
                                <span style={{ alignContent: 'center' }}>Comments</span>
                            </div>
                        </th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', width: '10%', fontWeight: 'bold' }}>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} style={{ borderBottom: '1px solid #ddd', backgroundColor: row.id % 2 === 0 ? '#eee' : 'white', }}>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', }}>{row.id}</td>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', }}>{row.recruiterName}</td>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', }}>{row.team}</td>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', }}>{row.month}</td>
                            <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', }}>
                                {row.weeklyData.map((week, weekIndex) => (
                                    <div key={weekIndex}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr 1fr 2fr',
                                            padding: '5px',
                                            borderBottom: weekIndex < row.weeklyData.length - 1 ? '1px solid #ddd' : 'none',
                                        }}>
                                        <span style={{ borderRight: '1px solid #ddd', fontSize: '.75rem' }}>{`Week ${weekIndex + 1}`}</span>
                                        <span style={{ borderRight: '1px solid #ddd', fontSize: '.75rem' }}>{week.submittedInterviews}</span>
                                        <span style={{ borderRight: '1px solid #ddd', fontSize: '.75rem' }}>{week.achievedInterviews}</span>
                                        <span title={week.comments}
                                            style={{
                                                fontSize: '.85rem',
                                                display: 'block',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                cursor: 'pointer',
                                                position: 'relative',
                                            }}>{week.comments}</span>
                                    </div>
                                ))}
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleUpdateRow(row)}
                                    sx={{ bgcolor: 'primary.main', textTransform: 'none', padding: '8px 16px' }}
                                >
                                    Update
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    gap: 2,
                }}
            >
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: 'flex-start', gap: 2 }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleAddRow}
                            sx={{ bgcolor: 'primary.main', textTransform: 'none', padding: '8px 16px' }}
                        >
                            Add Score Card
                        </Button>
                    </Stack>
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
                        ) : (
                            rows.length === 0 ? (
                                <Alert sx={{ p: 2, marginTop: 10 }} severity="info">
                                    No ScoreCard data available for {selectedRecruiter}.
                                </Alert>
                            ) : (
                                <Paper sx={{ p: 1 }} elevation={6}>
                                    {renderTable()}
                                </Paper>
                            )
                        )}
                    </Box>
                    {isModalOpen && (
                        <div className="modal">
                            <AddRowModal
                                isOpen={isModalOpen}
                                onSubmit={handleFormSubmit}
                                onClose={() => setIsModalOpen(false)}
                                selectedRecruiter={selectedRecruiter}
                                formData={formData}
                            />
                        </div>
                    )}
                </Stack>
            </Box>
        </ThemeProvider >
    );
};

export default ScoreCardDetails;