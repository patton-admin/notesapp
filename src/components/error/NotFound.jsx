import React from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, Typography } from "@mui/material";

const NotFound = () => {
    const theme = createTheme({
        typography: {
            h3: {
                fontSize: "1.2rem",
                "@media (min-width:600px)": {
                    fontSize: "1.5rem",
                },
            },
        },
    });

    return (
        <div style={{ marginBottom: "400px", marginTop: "50px", textAlign: "center" }}>
            <ThemeProvider theme={theme}>
                <Link to="/home" style={{ color: "Black" }}>
                    Go-Home -
                </Link>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                    {" "}
                    404 PAGE NOT FOUND!!!
                </Typography>
            </ThemeProvider>
        </div>
    );
};

export default NotFound;
