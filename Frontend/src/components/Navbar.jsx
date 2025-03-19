import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="fixed" sx={{ 
            width: "100%", 
            backgroundColor: "rgb(6,6,6)",
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
            <Container maxWidth="xl"> {/* Ensures full width */}
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Contest Tracker
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/platform/LeetCode">
                        LeetCode
                    </Button>
                    <Button color="inherit" component={Link} to="/platform/Codeforces">
                        Codeforces
                    </Button>
                </Toolbar>

            </Container>
            
        </AppBar>
    );
};

export default Navbar;
