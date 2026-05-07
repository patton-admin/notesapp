import React from "react";
// import "../styles/NavBar.css";

const Footer = () => {
    return (<footer style={{
        // position: 'fixed',
        // bottom: '0',
        width: '100%',
        height: '30px',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: '5px 0',
        position: 'relative'
    }}>
        <span>
            <a className="a-footer" style={{ color: 'white', textDecoration: 'none' }}>Patton Labs ©</a>
        </span>
    </footer>);
};

export { Footer as default };
