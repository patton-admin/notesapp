import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const StandardDataGrid = ({
                              rows = [],
                              columns = [],
                              pageSize = 10,
                              checkboxSelection = false,
                              onRowSelectionChange = () => {},
                              loading = false,
                              sx = {
                                  '& .MuiDataGrid-root': {
                                      border: 'none',
                                  },
                                  '& .MuiDataGrid-cell': {
                                      borderBottom: 1,
                                  },
                                  '& .MuiDataGrid-columnHeaders': {
                                      backgroundColor: '#1565c0',
                                      color: '#fff',
                                  },
                              },
                              ...props
                          }) => {
    return (
        <Box sx={{ height: '100%', width: '100%', ...sx }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                autoHeight
                checkboxSelection={checkboxSelection}
                onRowSelectionModelChange={onRowSelectionChange}
                loading={loading}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 1,
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#1565c0',
                        color: '#fff',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#f5f5f5',
                    },
                    ...sx,
                }}
                {...props}
            />
        </Box>
    );
};

export default StandardDataGrid;