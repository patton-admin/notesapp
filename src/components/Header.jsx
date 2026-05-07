import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, Drawer, IconButton, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';
import SupportAgentOutlined from '@mui/icons-material/SupportAgentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Header = ({ user, handleLogout, role }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const logoutMenu = Boolean(anchorEl);
    const navItems = [
        { name: "Patton Labs" },
        { name: "Home", path: "/home", icon: <HomeOutlinedIcon /> },
        { name: "Dashboard", path: role === 'Admin' ? "/dashboard" : "/home", icon: <DashboardOutlinedIcon /> },
        { name: "Score Card", path: "/scorecard", icon: <ListAltOutlined /> },
        { name: "Job Orders", path: "/jobOrders", icon: <ShoppingCartOutlinedIcon /> },
        { name: "Support", path: "/support", icon: <SupportAgentOutlined /> },
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };


    const drawer = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
            <List>
                {navItems.map((item, index) => (
                    <div key={item.name}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <NavLink to={item.path} style={{ color: 'inherit', display: 'flex', flexDirection: 'row', textDecoration: 'none', width: '100%' }}>
                                    <ListItemIcon >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </NavLink>
                            </ListItemButton>
                        </ListItem>
                        {index < navItems.length - 1 && item.name === 'Patton Labs' ? (
                            <Divider sx={{ borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.2)' }} />
                        ) : (
                            <Divider />
                        )}
                    </div>
                ))}
            </List>
        </Box >
    );


    return (
        <div>
            <nav style={{
                position: "sticky",
                top: 0,
                zIndex: 999,
                backgroundColor: "#181717",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                wigth: '100%',
                height: '55px'
            }}>
                <div>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => toggleDrawer(true)}
                        sx={{ mr: 2 }}

                    >
                        <MenuOutlinedIcon sx={{ color: 'white', marginLeft: '20px' }} fontSize="medium" />
                    </IconButton>
                    <span style={{ color: 'white', fontSize: '1.3em', fontWeight: 'bold' }}>PATTON LABS</span>
                </div>
                <IconButton>
                    <AccountCircleOutlinedIcon sx={{ color: 'white', marginRight: '20px', }} onClick={handleClick} fontSize='medium' />
                </IconButton>

                <Drawer open={open} onClose={() => toggleDrawer(false)} sx={{ zIndex: 1000 }}>
                    {drawer}
                </Drawer>
                <Menu
                    open={logoutMenu}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                textAlign: 'center',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem sx={{ textAlign: 'center', pointerEvents: 'none' }}>
                        Thank you!
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        Sign Out
                    </MenuItem>
                </Menu>
            </nav>
        </div >
    );
}

export default Header;