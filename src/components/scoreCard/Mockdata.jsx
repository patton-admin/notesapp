export const mockRecruitersData = {
    data: {
        data: [
            {
                recruiterName: "John Doe",
                month: "September",
                year: 2025,
                timestamp: new Date().toLocaleString(),
                weeklyData: [
                    { achievedInterviews: 5, comments: "Week 1 good." },
                    { achievedInterviews: 3, comments: "Week 2 average." },
                    { achievedInterviews: 7, comments: "Week 3 excellent." },
                    { achievedInterviews: 4, comments: "Week 4 on target." },
                    { achievedInterviews: 6, comments: "Week 5 solid performance." },
                ],
            },
            {
                recruiterName: "Jane Smith",
                month: "August",
                year: 2025,
                timestamp: new Date().toLocaleString(),
                weeklyData: [
                    { achievedInterviews: 2, comments: "Week 1 slow start." },
                    { achievedInterviews: 6, comments: "Week 2 strong finish." },
                    { achievedInterviews: 5, comments: "Week 3 consistent." },
                    { achievedInterviews: 3, comments: "Week 4 a bit low." },
                    { achievedInterviews: 7, comments: "Week 5 great effort." },
                ],
            },
        ],
    },
};

export const mockRecruiterList = {
    data: {
        body: {
            data: [
                "recruiter#John Doe",
                "recruiter#Jane Smith"
            ]
        }
    }
};