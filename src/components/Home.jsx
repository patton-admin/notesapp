
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./../styles/tile-container.css";
import { Card, CardContent, Divider, Paper, Tooltip } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';
import { quotes } from "./Quotes";


const Home = ({ sendMsg, visibleUser, role }) => {
  const navigate = useNavigate();
  const [localMessage, setLocalMessage] = useState(false);
  const today = new Date().toISOString().slice(0, 10);


  const index = new Date(today).getDate() % quotes.length;
  const quoteOfTheDay = quotes[index];

  const redirect = (input) => {
    if (role === "Admin" && input === "Dashboard") {
      navigate("/dashboard");
    } else {
      setLocalMessage(true);
    }

    if (input === "scoreCard") {
      navigate("/scoreCard");
    }

    if (input === "jobOrder") {
      navigate("/jobOrders");
    }
  };

  const closing = () => {
    setLocalMessage(false);
  };

  useEffect(() => {
    const input = visibleUser;
    if (input) {
      // sendMsg(input);
    } else {
      // sendMsg();
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
        <Card sx={{ minWidth: 275, maxWidth: 800, }} elevation={3}>
          <CardContent>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexDirection: 'row' }}>
              <span style={{ fontStyle: 'italic' }}>Quote for the day!</span>
              <Divider orientation="vertical" varient='middle' flexItem sx={{ borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.2)', fontSize: '1.2rem' }} />
              <p style={{ marginTop: '15px' }}>"{quoteOfTheDay}"</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="tile-container">
        <Card elevation={4}>
          <div className="tile">
            <CardContent>
              <a
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => {
                  redirect("Dashboard");
                }}
              >
                <p className="tile-icon">
                  <DashboardOutlinedIcon sx={{ fontSize: '2rem' }} color="primary" />
                </p>
                <div className="tile-label-container" style={{ display: "flex", flexDirection: "column" }}>
                  <label className="tile-label">Dashboard</label>
                  <label className="tile-subtext"> Progress Monitoring</label>
                </div>
              </a>
            </CardContent>
          </div>
        </Card>


        <Card elevation={4}>
          <div className="tile">
            <CardContent>
              <a
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => {
                  redirect("scoreCard");
                }}
              >
                <p className="tile-icon">
                  <ListAltOutlined sx={{ fontSize: '2rem' }} color="secondary" />
                </p>
                <div className="tile-label-container" style={{ display: "flex", flexDirection: "column" }}>
                  <label className="tile-label">Score Card</label>
                  <label className="tile-subtext">Rate Recruiters</label>
                </div>
              </a>
            </CardContent>
          </div>
        </Card>

        <Card elevation={4}>
          <div className="tile">
            <CardContent>
              <a
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => {
                  redirect("jobOrder");
                }}
              >
                <p className="tile-icon">
                  <ShoppingCartOutlinedIcon sx={{ fontSize: '2rem' }} color="success" />
                </p>
                <div className="tile-label-container" style={{ display: "flex", flexDirection: "column" }}>
                  <label className="tile-label">Job Orders</label>
                  <label className="tile-subtext"> Create Job Orders</label>
                </div>
              </a>
            </CardContent>
          </div>
        </Card>

      </div>
    </div >
  );
};
export default connect()(Home);
