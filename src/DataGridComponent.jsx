import { DataGrid } from '@mui/x-data-grid'
import { ThemeProvider, createTheme, Button, Stack } from '@mui/material'
import { useState } from 'react'

const theme = createTheme()

function DataGridComponent() {
    const initialRows = [
        { id: 1, user_createdby: 'John Doe', user_loginid: 'john123' },
        { id: 2, user_createdby: 'Jane Smith', user_loginid: 'jane456' },
        { id: 3, user_createdby: 'Bob Johnson', user_loginid: 'bob789' }
    ]

    const [rows, setRows] = useState(initialRows)
    const [selectedRows, setSelectedRows] = useState([])

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user_createdby', headerName: 'Created By', width: 200 },
        { field: 'user_loginid', headerName: 'Login ID', width: 200 }
    ]

    const handleAddRow = () => {
        const newId = Math.max(...rows.map(row => row.id)) + 1
        const newRow = {
            id: newId,
            user_createdby: `User ${newId}`,
            user_loginid: `user${newId}`
        }
        setRows([...rows, newRow])
    }

    const handleDeleteRows = () => {
        const updatedRows = rows.filter(row => !selectedRows.includes(row.id))
        setRows(updatedRows)
        setSelectedRows([])
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={2} sx={{ width: '100%', p: 2 }}>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={handleAddRow}
                        sx={{ bgcolor: 'primary.main' }}
                    >
                        Add Row
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleDeleteRows}
                        disabled={selectedRows.length === 0}
                        sx={{ bgcolor: 'error.main' }}
                    >
                        Delete Selected
                    </Button>
                </Stack>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoHeight
                        pageSizeOptions={[5, 10, 25]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        checkboxSelection
                        onRowSelectionModelChange={(newSelection) => {
                            setSelectedRows(newSelection)
                        }}
                        disableRowSelectionOnClick
                    />
                </div>
            </Stack>
        </ThemeProvider>
    )
}

export default DataGridComponent