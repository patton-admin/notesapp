import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faLightbulb,
    faHome,
    faShoppingCart,
    faGlobeAmericas,
    faInfo,
    faHandsHelping,
    faSignOutAlt,
    faUser,
    faChartLine
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

library.add(
    faLightbulb,
    faHome,
    faShoppingCart,
    faGlobeAmericas,
    faInfo,
    faHandsHelping,
    faSignOutAlt,
    faUser
);

const Header = ({ user, handleLogout }) => (
    <nav
        style={{
            position: "sticky",
            top: 0,
            zIndex: 99999,
            backgroundColor: "#181717",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}
    >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <NavLink
                to="/home"
                style={({ isActive }) => ({
                    color: isActive ? "#15b5ea" : "#fff",
                    textDecoration: "none",
                    pointerEvents: "none"
                })}
            >
                <FontAwesomeIcon icon="lightbulb" color="#15b5ea" />
                <span style={{ margin: "0 0.5rem" }}>Patton Score Card</span>
                <FontAwesomeIcon icon="lightbulb" color="#15b5ea" />
            </NavLink>

            <NavLink
                to="/home"
                style={({ isActive }) => ({
                    color: isActive ? "#15b5ea" : "#fff",
                    textDecoration: "none"
                })}
            >
                <FontAwesomeIcon icon="home" /> Home
            </NavLink>

            <NavLink
                to="/jobOrders"
                style={({ isActive }) => ({
                    color: isActive ? "#15b5ea" : "#fff",
                    textDecoration: "none"
                })}
            >
                <FontAwesomeIcon icon="shopping-cart" /> Job Orders
            </NavLink>

            <NavLink
                to="/scorecard"
                style={({ isActive }) => ({
                    color: isActive ? "#15b5ea" : "#fff",
                    textDecoration: "none"
                })}
            >
                <FontAwesomeIcon icon={faChartLine} /> Score Card
            </NavLink>

            <NavLink
                to="/support"
                style={({ isActive }) => ({
                    color: isActive ? "#15b5ea" : "#fff",
                    textDecoration: "none"
                })}
            >
                <FontAwesomeIcon icon="info" /> Support
            </NavLink>

            <NavLink
                to="/help"
                style={({ isActive }) => ({
                    color: isActive ? "#15b5ea" : "#fff",
                    textDecoration: "none"
                })}
            >
                <FontAwesomeIcon icon="hands-helping" /> Help
            </NavLink>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
            <NavLink
                to="/user"
                style={({ isActive }) => ({
                    color: isActive ? "#15b5ea" : "#fff",
                    textDecoration: "none"
                })}
            >
                <FontAwesomeIcon icon="user" />
                <span style={{ marginLeft: "0.5rem" }}>
                    Hi {user ? user : ""}
                </span>
            </NavLink>

            <NavLink
                to="/logout"
                onClick={handleLogout}
                style={{ color: "#fff", textDecoration: "none" }}
            >
                <FontAwesomeIcon icon="sign-out-alt" />
            </NavLink>
        </div>
    </nav>
);

export default Header;