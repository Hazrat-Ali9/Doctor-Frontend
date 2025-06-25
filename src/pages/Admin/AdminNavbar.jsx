import { useState } from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        Cookie.remove('authToken');
        toast.success("Logout Successful");
        setDrawerOpen(false); // Close the drawer before navigating
        navigate("/admin-login"); // Redirect to admin-login after logout
    };

    const handleNavigation = (path) => {
        setDrawerOpen(false); // Close the drawer after navigation
        navigate(path);
    };

    return (
        <>
            {/* Navbar */}
            <BootstrapNavbar bg="light" expand="lg" className="d-flex">
                <div style={{ marginRight: "1vw" }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </div>
                <div>
                    <BootstrapNavbar.Brand>EveCare Hospital - Admin Panel</BootstrapNavbar.Brand>
                </div>
                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
            </BootstrapNavbar>

            {/* Drawer */}
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: 'lightgray',
                    },
                }}
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button>
                        <ListItemText primary="Home" onClick={() => handleNavigation('/admin')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Reviews" onClick={() => handleNavigation('/admin/reviews')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Experties" onClick={() => handleNavigation('/admin/experties')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Add Doctor" onClick={() => handleNavigation('/admin/workinghours')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="About" onClick={() => handleNavigation('/admin/bio')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Setting" onClick={() => handleNavigation('/admin/settings')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Logout" onClick={handleLogout} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
