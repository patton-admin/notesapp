// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Alert from "@material-ui/lab/Alert";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { viewBucket } from "../actions/bucket";
// import { viewCandidate } from "../actions/candidate";
// import { viewClient } from "../actions/client";
// // import { viewTodo } from "../actions/todo";
// import { viewLov } from "../actions/util";
// import { getDashboardData, getLeadDashboardData } from "../actions/dashboard";
// import { getAllJob } from "../actions/job";
// import { getAllUser } from "../actions/user";
// import { bucketFilter } from "../selectors/visibleBucket";
// import { history } from "./../routers/AppRouters";
// import "./../styles/grid.css";
//
// const Home = ({ sendMsg, visibleUser, role }) => {
//   const [localMessage, setLocalMessage] = useState(false);
//
//   const redirect = (input) => {
//     if (input === "Admin" && role === "Sadmin") {
//       history.push("/usrMngmt");
//     } else {
//       setLocalMessage(true);
//     }
//
//     if (input === "hotJobs") {
//       history.push("/joborders");
//     }
//
//     if (input === "mybucket") {
//       history.push("/myBucket");
//     }
//
//     if (input === "GlobalBucket") {
//       history.push("/globalBucket");
//     }
//     if (input === "Lead") {
//       history.push("/lead");
//     }
//     if (input === "Local") {
//       history.push("/local");
//     }
//     if (input === "User") {
//       history.push("/user");
//     }
//     if (input === "Dashboard" && role === "Sadmin") {
//       history.push("/dashboard");
//     } else {
//       // setLocalMessage(true);
//     }
//     if (input === "Client") {
//       history.push("/client");
//     }
//   };
//
//   const closing = () => {
//     setLocalMessage(false);
//   };
//
//   useEffect(() => {
//     const input = visibleUser;
//     if (input) {
//       sendMsg(input);
//     } else {
//       sendMsg();
//     }
//   }, []);
//
//   return (
//     <div className="grid-align">
//       <div className="grid-margin grid-on-hover">
//         {localMessage === true && (
//           <Alert
//             onClose={() => {
//               closing();
//             }}
//             severity="info"
//             varient="outlined"
//           >
//             Please check with your Supervisor to get access
//           </Alert>
//         )}
//
//         <div className="grid-box">
//           <a
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               redirect("Dashboard");
//             }}
//           >
//             <p className="grid-img-align">
//               <FontAwesomeIcon
//                 icon="tachometer-alt"
//                 color="royalblue"
//                 size="3x"
//               />
//             </p>
//             <p></p>
//             {/* <img alt="image1" className="grid-img-align" src={dashboard} /> */}
//             <p></p>
//             <label className="grid-label" style={{ paddingLeft: "37px" }}>
//               Dashboard
//             </label>
//             <p></p>
//             <label className="grid-label-g" style={{ paddingLeft: "24px" }}>
//               Progress Monitoring
//             </label>
//           </a>
//         </div>
//
//         <div className="grid-box">
//           <a
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               redirect("hotJobs");
//             }}
//           >
//             <p className="grid-img-align">
//               <FontAwesomeIcon icon="fire" color="red" size="3x" />
//             </p>
//             <p></p>
//             <label className="grid-label" style={{ paddingLeft: "37px" }}>
//               Job Orders
//             </label>
//             <p></p>
//             <label className="grid-label-g" style={{ paddingLeft: "29px" }}>
//               Create Job Orders{" "}
//             </label>
//           </a>
//         </div>
//
//         <div className="grid-box">
//           <a
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               redirect("GlobalBucket");
//             }}
//           >
//             <p className="grid-img-align">
//               <FontAwesomeIcon icon="globe-americas" color="Green" size="3x" />
//             </p>
//             <p></p>
//             <label className="grid-label" style={{ paddingLeft: "27px" }}>
//               Score Card
//             </label>
//             <p></p>
//             <label className="grid-label-g" style={{ paddingLeft: "27px" }}>
//               Search Consultants
//             </label>
//           </a>
//         </div>
//
//         <p></p>
//         <p></p>
//         <p></p>
//         <p></p>
//       </div>
//     </div>
//   );
// };
//
// const mapDispatchToProps = (dispatch) => {
//   let startDate = moment().add(-30, "days").format("YYYY/MM/DD");
//   let endDate = moment().format("YYYY/MM/DD");
//   return {
//     sendMsg: (x) => {
//       dispatch(viewCandidate());
//       dispatch(getAllUser());
//       // dispatch(getAllJob());
//       // dispatch(viewClient());
//       // dispatch(viewBucket());
//       // dispatch(viewTodo());
//       dispatch(viewLov());
//       // dispatch(
//       //   getDashboardData({
//       //     startDate: startDate,
//       //     endDate: endDate,
//       //     bucketId: -1,
//       //   })
//       // );
//       // dispatch(
//       //   getLeadDashboardData({
//       //     startDate: startDate,
//       //     endDate: endDate,
//       //     bucketId: -1,
//       //   })
//       // );
//     },
//   };
// };
//
// const mapStateToProps = (state) => {
//   return {
//     role: state.login.role,
//     visibleUser: bucketFilter(state),
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
