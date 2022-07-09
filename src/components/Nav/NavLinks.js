import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const NavLinks = (props) => {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.pages.map((page) => (
                <Button
                    key={page}
                    onClick={props.handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
            ))}
        </Box>    
    );
}
 
export default NavLinks;