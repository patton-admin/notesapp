// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { default as React } from "react";
// import { NavLink } from "react-router-dom";
// import "./../styles/NavBar.css";
//
// const Header = (props) => (
//   <div
//     className="navbar"
//     style={{
//       position: "-webkit-sticky",
//       position: "sticky",
//       top: 0,
//       zIndex: 99999,
//     }}
//   >
//     <NavLink
//       to="/home"
//       exact={true}
//       onClick={(e) => e.preventDefault()}
//       style={{ pointerEvents: "none" }}
//     >
//       {" "}
//       <FontAwesomeIcon size="1x" icon="lightbulb" color="#15b5ea" /> Patton
//       Tracking System{" "}
//       <FontAwesomeIcon size="1x" icon="lightbulb" color="#15b5ea" />
//     </NavLink>
//
//     <NavLink
//       to="/home"
//       activeStyle={{
//         color: "#15b5ea",
//       }}
//     >
//       <FontAwesomeIcon icon="home" /> Home
//     </NavLink>
//
//     <NavLink
//       to="/dashboard"
//       activeStyle={{
//         color: "#15b5ea",
//       }}
//     >
//       <FontAwesomeIcon icon="home" /> Dashboard
//     </NavLink>
//
//     <NavLink
//       to="/jobOrders"
//       activeStyle={{
//         color: "#15b5ea",
//       }}
//     >
//       <FontAwesomeIcon icon="shopping-cart" /> Job Orders
//     </NavLink>
//
//     <NavLink
//       to="/globalBucket"
//       activeStyle={{
//         color: "#15b5ea",
//       }}
//     >
//       <FontAwesomeIcon icon="globe-americas" /> Score Card
//     </NavLink>
//
//     {/* <NavLink
//       to="/todo"
//       activeStyle={{
//         color: "#15b5ea",
//       }}
//     >
//       <FontAwesomeIcon icon="list-ol" /> To-Do's
//     </NavLink> */}
//
//     <NavLink
//       to="/support"
//       activeStyle={{
//         color: "#15b5ea",
//       }}
//     >
//       <FontAwesomeIcon icon="info" /> Support
//     </NavLink>
//
//     <NavLink
//       to="/help"
//       activeStyle={{
//         color: "#15b5ea",
//       }}
//     >
//       <FontAwesomeIcon icon="hands-helping" /> Help
//     </NavLink>
//
//     <NavLink
//       to="/logout"
//       style={{ float: "right" }}
//       onClick={props.handleLogout}
//     >
//       <FontAwesomeIcon icon="sign-out-alt" />
//     </NavLink>
//
//     <NavLink to="/user" style={{ float: "right" }}>
//       <FontAwesomeIcon icon="user" />
//       {"  "} Hi {props.user !== undefined ? props.user.split("@")[0] : ""}
//     </NavLink>
//   </div>
// );
//
// export default Header;
