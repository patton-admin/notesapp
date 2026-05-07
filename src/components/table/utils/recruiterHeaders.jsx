export const recruiterHeaders = [
    { field: 'id', headerName: 'Row', width: 10, headerClassName: 'header-bold' },
    { field: 'recruiterName', headerName: 'Recruiter Name', width: 250, headerClassName: 'header-bold' },
    { field: 'month', headerName: 'Month', width: 150, headerClassName: 'header-bold' },
    { field: 'timestamp', headerName: 'Timestamp', width: 150, headerClassName: 'header-bold' },
    {
        field: 'weeklyData',
        headerName: 'Weekly Performance',
        width: 450,
        headerClassName: 'header-bold',
        renderCell: (params) => (
            <div style={{ padding: '8px', whiteSpace: 'pre-wrap' }}>
                {params.value.map((week, index) => (
                    <div key={index}>
                        <strong>{`Week ${index + 1}:`}</strong>
                        {` Interviews: ${week.AchievedInterviews}, Comments: ${week.comments}`}
                    </div>
                ))}
            </div>
        )
    },


];