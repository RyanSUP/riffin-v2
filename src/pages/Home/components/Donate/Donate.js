import { Typography } from "@mui/material";
import { Box, Stack, Divider } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Donate = () => {
  return (
    // TODO This can be maped.
    <Stack spacing={3} sx={{textAlign: 'left'}}>
      <Divider >
        <Typography variant="p">Made by</Typography>
      </Divider>
      <Stack spacing={2}>
        <a href="https://www.linkedin.com/in/ryanmorici/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2">Ryan Morici</Typography>
            <LinkedInIcon />
          </Box>
        </a>
        <Typography variant="p">with a little help from my friends</Typography>
        <a href="https://www.linkedin.com/in/davidphilipcollis/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2">Dave Collis</Typography>
            <LinkedInIcon />
          </Box>
        </a>
        <Typography variant="p">&</Typography>
        <a href="https://www.linkedin.com/in/timcrisp94/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2">Tim Crisp</Typography>
            <LinkedInIcon />
          </Box>
        </a>
      </Stack>
      <Divider />
      <Typography variant="p">Be excellent to eachother, and party on dudes!</Typography>
    </Stack>
  );
}
 
export default Donate;