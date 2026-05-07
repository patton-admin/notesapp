import { ThemeProvider, createTheme, Button, Stack, Box, CircularProgress, Paper, Alert } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import AddJobOrderModal from "./AddJobOrderModal.jsx";
import { addJobOrder, updateJobOrder, getOrderActivity as getOrderActivityApi } from "../../api/api.jsx";

const theme = createTheme({
    typography: {
        fontFamily: 'poppins',
        fontSize: 14,
    },
});


const JobOrdersPage = ({ recruiter, user }) => {
    // const [rows, setRows] = useState(recruiter);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState(recruiter || user);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [formData, setFormData] = useState(null);
    const [rows, setRows] = useState([]);

    const fetchRecruiterInfo = useCallback(async (recruiterName) => {
        try {
            setIsLoading(true);
            // getOrderActivityApi already returns the orders array (data.orders)
            const orders = await getOrderActivityApi({ recruiterName });
            console.log('Order activity API response:', orders);

            const safeOrders = Array.isArray(orders) ? orders : [];
            setRows(
                safeOrders.map((order, index) => ({
                    ...order,
                    id: order.id ?? index + 1,
                    subBy: order.subBy || recruiterName,
                }))
            );
        } catch (error) {
            console.error('Error fetching recruiter orders:', error);
            setRows([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (selectedRecruiter) {
            fetchRecruiterInfo(selectedRecruiter);
        } else {
            setRows([]);
        }
    }, [selectedRecruiter, fetchRecruiterInfo]);

    const handleAddRow = () => {
        setFormData(null);
        setIsModalOpen(true);
    };

    const handleUpdateRow = (rowData) => {
        setFormData(rowData);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (values) => {
        if (values?.id) {
            await handleFormUpdate(values);
        } else {
            await handleFormSubmit(values);
        }
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

        const newRow = {
            orderName: formData.orderName || '',
            orderDate: formData.orderDate || '',
            subDate: formData.subDate || '',
            client: formData.client || '',
            status: formData.status || 'Active',
            tSourced: formData.tSourced || '',
            subBy: formData.subBy || selectedRecruiter || '',
            candidate: formData.candidate || '',
            clientRecruiter: formData.clientRecruiter || '',
            candidateStatus: formData.candidateStatus || '',
            feedback: formData.feedback || '',
            comments: formData.comments || '',
        };
        console.log('Payload being sent to API:', newRow);

        try {
            const isAdded = await addJobOrder(newRow);
            console.log('API Response:', isAdded);
            if (isAdded?.status === 201) {
                const createdItem = isAdded.data?.data || newRow;
                setRows((prevRows) => [
                    ...prevRows,
                    {
                        ...createdItem,
                        id: prevRows.length > 0
                            ? Math.max(...prevRows.map((row) => row.id || 0)) + 1
                            : 1,
                    },
                ]);
            } else {
                console.error("Failed to add job order");
            }
        } catch (error) {
            console.error("Error adding score card:", error);
        } finally {
            setIsModalOpen(false);
            setFormData(null);
        }
    };

    const handleFormUpdate = async (formData) => {
        console.log('Update form submitted:', formData);

        const updatedRow = {
            PK: formData.PK,
            SK: formData.SK,
            id: formData.id,
            orderName: formData.orderName || '',
            orderDate: formData.orderDate || '',   // sent so service can keep GSI2SK date correct
            subDate: formData.subDate || '',
            client: formData.client || '',
            status: formData.status || 'Active',
            tSourced: formData.tSourced || '',
            subBy: formData.subBy || selectedRecruiter || '',
            candidate: formData.candidate || '',
            clientRecruiter: formData.clientRecruiter || '',
            candidateStatus: formData.candidateStatus || '',
            feedback: formData.feedback || '',
            comments: formData.comments || '',
        };
        console.log('Payload being sent to API(Update):', updatedRow);

        try {
            const isUpdated = await updateJobOrder(updatedRow);
            console.log('API Response:', isUpdated);
            const success = Boolean(
                isUpdated?.status === 200 ||
                isUpdated?.status === 201 ||
                isUpdated?.data?.statusCode === 200 ||
                isUpdated?.data?.statusCode === 201
            );

            if (success) {
                setRows((prevRows) =>
                    prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
                );
            } else {
                console.error('Failed to update job order');
            }
        } catch (error) {
            console.error('Error updating job order:', error);
        } finally {
            setIsModalOpen(false);
            setFormData(null);
        }
    };



    const renderTable = () => (
        <div style={{
            overflow: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            maxHeight: '80vh',
        }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '1200px',
                tableLayout: 'fixed'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#ddd', color: '#000' }}>
                        {/* <th style={{ ...thStyle, width: '5%' }}>No</th> */}
                        <th style={{ ...thStyle, width: '15%' }}>Order Name</th>
                        <th style={{ ...thStyle, width: '7.5%' }}>Order Date</th>
                        <th style={{ ...thStyle, width: '7.5%' }}>Sub Date</th>
                        <th style={{ ...thStyle, width: '7.5%' }}>Client</th>
                        <th style={{ ...thStyle, width: '7.5%' }}>Status</th>
                        <th style={{ ...thStyle, width: '7.5%' }}>T. Sourced</th>
                        <th style={{ ...thStyle, width: '7.5%' }}>SUB By</th>
                        <th style={{ ...thStyle, width: '15%' }}>Candidate</th>
                        <th style={{ ...thStyle, width: '7.5%' }}>C.Recruiter</th>
                        <th style={{ ...thStyle, width: '12.5%' }}>Candidate Status</th>
                        <th style={{ ...thStyle, width: '6%' }}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}
                            style={{
                                backgroundColor: index % 2 === 0 ? '#fff' : '#f7f7f7',
                                borderBottom: '1px solid #ddd'
                            }}>
                            {/* <td style={{ ...tdStyle, width: '5%' }}>{index + 1} </td> */}

                            <td style={{ ...tdStyle, width: '12%', }} title={row.orderName}>{row.orderName || '-'}</td>
                            <td style={{ ...tdStyle, width: '7.5%' }} title={row.orderDate}>{row.orderDate || '-'}</td>
                            <td style={{ ...tdStyle, width: '7.5%' }} title={row.subDate}>{row.subDate || '-'}</td>
                            <td style={{ ...tdStyle, width: '7.5%' }} title={row.client}>{row.client || '-'}</td>

                            <td
                                style={{
                                    ...tdStyle,
                                    width: '7.5%',
                                    color:
                                        row.status === 'Hold' || row.status === 'On Hold'
                                            ? 'red'
                                            : '#333',
                                    fontWeight: row.status === 'Hold' ? '600' : 'normal',
                                }}
                                title={row.status}
                            >
                                {row.status || '-'}
                            </td>

                            <td style={{ ...tdStyle, width: '7.5%' }} title={row.tSourced}>{row.tSourced || '-'}</td>
                            <td style={{ ...tdStyle, width: '7.5%' }} title={row.subBy}>{row.subBy || '-'}</td>

                            <td
                                style={{
                                    ...tdStyle,
                                    width: '12%',
                                    backgroundColor: row.candidate?.includes('on boarding')
                                        ? '#ffe699'
                                        : 'transparent',
                                }}
                                title={row.candidate}
                            >
                                {row.candidate || '-'}
                            </td>

                            <td style={{ ...tdStyle, width: '7.5%' }} title={row.clientRecruiter}>{row.clientRecruiter || '-'}</td>

                            <td
                                style={{
                                    ...tdStyle,
                                    width: '11%',
                                    backgroundColor: row.candidateStatus?.includes('Submitted')
                                        ? '#92d050'
                                        : 'transparent',
                                }}
                                title={row.candidateStatus}
                            >
                                {row.candidateStatus || '-'}
                            </td>
                            <td style={{ padding: '15px 15px', width: '6%' }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleUpdateRow(row)}
                                    sx={{ bgcolor: 'primary.main', textTransform: 'none', padding: '5px 5px' }}
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    const thStyle = {
        padding: '10px 8px',
        textAlign: 'center',
        fontWeight: 'bold',
        border: '1px solid #ccc',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: '0.9rem',
    };

    const tdStyle = {
        padding: '10px',
        textAlign: 'center',
        borderRight: '1px solid #eee',
        fontSize: '.9rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        position: 'relative',
    };

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
                            Add Job Order
                        </Button>
                    </Stack>
                    <Box
                        sx={{
                            flexGrow: 1,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // overflow: 'auto',
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            rows.length === 0 ? (
                                <Alert sx={{ p: 2, marginTop: 10 }} severity="info">
                                    No JobOrder data available for {selectedRecruiter}.
                                </Alert>
                            ) : (
                                <Paper elevation={6}>
                                    {renderTable()}
                                </Paper>
                            )
                        )}
                    </Box>
                    {isModalOpen && (
                        <div className="modal">
                            <AddJobOrderModal
                                isOpen={isModalOpen}
                                onSubmit={handleModalSubmit}
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
// return (
//     <div style={{ color: 'white', padding: '20px' }}>
//         <h1>Job Orders Page</h1>
//         <p>This is the Job Orders page content.</p>
//     </div>
// )
// }
export default JobOrdersPage;                