import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const NavLinks = (props) => {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.pages.map((page) => (
                <Button
                    key={page['name']}
                    onClick={()=> props.handleClickOnPage(page['path'])}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page['name']}
                </Button>
            ))}
        </Box>    
    );
}
 
export default NavLinks;