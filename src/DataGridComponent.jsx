import {DataGrid, GridToolbar} from '@mui/x-data-grid'
import {ThemeProvider, createTheme, Button, Stack, Box} from '@mui/material'
import {useEffect, useState} from 'react';
import {CircularProgress} from '@mui/material';

import AddRowModal from "./AddRowModal.jsx";
import {addScoreCard, getAllCandidates} from "./api/api.jsx";

const theme = createTheme({
    typography: {
        fontFamily: 'Garamond',
        fontSize: 14,
    },
});

const columns = [
    {field: 'id', headerName: 'Row', width: 10, headerClassName: 'header-bold'},
    {field: 'recruiterName', headerName: 'Recruiter Name', width: 130, headerClassName: 'header-bold'},
    {field: 'team', headerName: 'Team', width: 100, headerClassName: 'header-bold'},
    {field: 'achievedInterviews', headerName: 'Achieved Interviews', width: 130, headerClassName: 'header-bold'},
    {field: 'expectedInterviews', headerName: 'Expected Interviews', width: 130, headerClassName: 'header-bold'},
    {field: 'lead', headerName: 'Lead', width: 20, headerClassName: 'header-bold'},
    {field: 'comments', headerName: 'Comments', width: 300, headerClassName: 'header-bold'},
    {field: 'timestamp', headerName: 'Timestamp', width: 100, headerClassName: 'header-bold'},
];

const DataGridComponent = ({recruiter}) => {
    const [rows, setRows] = useState(recruiter);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({user_createdby: '', user_loginid: ''});

    useEffect(() => {
        if (recruiter) {
            setRows(recruiter);
            setIsLoading(false);
        }
    }, [recruiter]);

    const fetchRecruitersInfo = async () => {
        try {
            const getRecruitersInfo = await getAllCandidates();
            if (getRecruitersInfo?.status === 200) {
                const {data} = getRecruitersInfo.data;
                setRows(data);
            }
        } catch (error) {
            console.error("Error fetching recruiters info:", error);
        }
    };

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
            recruiterName: request.recruiterName,
            team: request.team,
            achievedInterviews: request.achievedInterviews,
            expectedInterviews: request.expectedInterviews,
            lead: request.lead,
            comments: request.comments,
            timestamp: new Date().toLocaleString(),
            month: request.month,
            year: request.year,
            day: request.day,
            "type": "post",
        };
        setRows([...rows, newRow]);
        setIsModalOpen(false);
        setFormData({user_createdby: '', user_loginid: ''});
        const isAdded = await addScoreCard(newRow);
        if(isAdded && isAdded.data && isAdded.data.statusCode === 201) {
           // await fetchRecruitersInfo();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                height: 'calc(100vh - 200px)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: 2
            }}>
                <Stack spacing={2} sx={{width: '100%', p: 2}}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            onClick={handleAddRow}
                            sx={{bgcolor: 'primary.main'}}
                        >
                            Add Score Card
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleDeleteRows}
                            disabled={selectedRows.length === 0}
                            sx={{bgcolor: 'error.main'}}
                        >
                            Delete Selected Score Card
                        </Button>
                    </Stack>

                    {isModalOpen && (
                        <div className="modal">
                            <AddRowModal
                                isOpen={isModalOpen}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={handleFormSubmit}
                                onClose={() => setIsModalOpen(false)}
                            />
                        </div>
                    )}

                    <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {isLoading ? <CircularProgress /> : (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                autoHeight
                                pageSizeOptions={[5, 10, 25]}
                                initialState={{
                                    pagination: {paginationModel: {pageSize: 10}},
                                }}
                                checkboxSelection
                                onRowSelectionModelChange={(newSelection) => {
                                    setSelectedRows(newSelection)
                                }}
                                disableRowSelectionOnClick
                                sx={{
                                    '& .MuiDataGrid-root': {
                                        border: 'none',
                                    },
                                    '& .MuiDataGrid-cell': {
                                        borderBottom: 1
                                    },
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: '#1565c0',
                                        color: '#fff'
                                    }
                                }}
                            />
                        )}
                    </Box>
                </Stack>
            </Box>
        </ThemeProvider>
    )
}

export default DataGridComponent