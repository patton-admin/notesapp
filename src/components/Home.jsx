
// import Alert from "@material-ui/lab/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faChartLine, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { history } from "./../routers/AppRouters";
import { useNavigate } from "react-router-dom";
import "./../styles/tile-container.css";

const Home = ({ sendMsg, visibleUser, role }) => {
  const navigate = useNavigate();
  const [localMessage, setLocalMessage] = useState(false);

  const redirect = (input) => {
    if (input === "Admin" && role === "Sadmin") {
      history.push("/usrMngmt");
    } else {
      setLocalMessage(true);
    }

    if (input === "scoreCard") {
      navigate("/scoreCard");
    }

    if (input === "mybucket") {
      history.push("/myBucket");
    }

    if (input === "GlobalBucket") {
      history.push("/globalBucket");
    }
    if (input === "Lead") {
      history.push("/lead");
    }
    if (input === "Local") {
      history.push("/local");
    }
    if (input === "User") {
      history.push("/user");
    }
    if (input === "Dashboard" && role === "Sadmin") {
      history.push("/dashboard");
    } else {
      // setLocalMessage(true);
    }
    if (input === "Client") {
      history.push("/client");
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
    <div className="grid-align">
      <div className="grid-margin grid-on-hover">
        <div className="tile-container">
          <div className="tile">
            <a
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => {
                  redirect("");
                }}
            >
              <p className="tile-icon">
                <FontAwesomeIcon
                    icon={faTachometerAlt}
                    color="royalblue"
                    size="3x"
                />
              </p>
              <div className="tile-label-container" style={{ display: "flex", flexDirection: "column" }}>
                <label className="tile-label">Dashboard</label>
                <label className="tile-subtext"> Progress Monitoring</label>
              </div>
            </a>
          </div>

          <div className="tile">
            <a
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => {
                  redirect("");
                }}
            >
              <p className="tile-icon">
                <FontAwesomeIcon
                    icon={faShoppingCart}
                    color="kingblue"
                    size="3x"
                />
              </p>
              <div className="tile-label-container" style={{ display: "flex", flexDirection: "column" }}>
                <label className="tile-label">Job Orders</label>
                <label className="tile-subtext"> Create Job Orders</label>
              </div>
            </a>
          </div>

          <div className="tile">
            <a
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => {
                  redirect("scoreCard");
                }}
            >
              <p className="tile-icon">
                <FontAwesomeIcon icon={faChartLine} color="Green" size="3x" />
              </p>
              <div className="tile-label-container" style={{ display: "flex", flexDirection: "column" }}>
                <label className="tile-label">Score Card</label>
                <label className="tile-subtext">Rate Recruiters</label>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect()(Home);
