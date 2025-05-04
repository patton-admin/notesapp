import React from "react";
import { Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const NotFound = () => {
    const theme = createMuiTheme();

    theme.typography.h3 = {
        fontSize: "1.2rem",
        "@media (min-width:600px)": {
            fontSize: "1.5rem",
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "2rem",
        },
    };
    return (
        <div
            style={{ marginBottom: "400px", marginTop: "50px", textAlign: "center" }}
        >
            <ThemeProvider theme={theme}>
                <Link to="/home" style={{ color: "Black" }}>
                    Go-Home -
                </Link>
                <Typography
                    variant="h7"
                    style={{ textAlign: "center" }}
                    style={{ textAlign: "center" }}
                >
                    {" "}
                    404 PAGE NOT FOUND!!!
                </Typography>
            </ThemeProvider>
        </div>
    );
};

export default NotFound;
