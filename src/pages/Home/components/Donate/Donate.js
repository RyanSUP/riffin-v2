import { Button, Typography } from "@mui/material";
import { Box, Stack, Divider } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Donate = () => {
  return (
    // TODO This can be maped.
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="p">Made by</Typography>
        <a href="https://www.linkedin.com/in/ryanmorici/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2">Ryan Morici</Typography>
            <LinkedInIcon />
          </Box>
        </a>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="p">with contributions from</Typography>
        <a href="https://www.linkedin.com/in/davidphilipcollis/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2">Dave Collis</Typography>
            <LinkedInIcon />
          </Box>
        </a>
        <a href="https://www.linkedin.com/in/timcrisp94/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2">Tim Crisp</Typography>
            <LinkedInIcon />
          </Box>
        </a>
      </Stack>
      <Divider />
    </Stack>
  );
}
 
export default Donate;