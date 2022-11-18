import {  Typography } from "@mui/material";
import { Box, Stack, Divider, useTheme } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BuyMeACoffeeButton from "../HeaderLinks/BuyMeACofeeButton/BuyMeACoffeeButton";
import ReachOut from "./ReachOut";
const DonateMobile = () => {
  const theme = useTheme();

  const displayDonateStyle = {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    }
  };

  return (
    // TODO This can be maped.
    <Stack spacing={3} sx={{textAlign: 'center', width: '100%', ...displayDonateStyle}}>
      <Divider >
        <Typography variant="p">Made by</Typography>
      </Divider>
      <Stack spacing={2} sx={{width: '100%', margin: '0 auto'}}>
        <a href="https://www.linkedin.com/in/ryanmorici/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <LinkedInIcon />
            <Typography variant="h2">Ryan Morici</Typography>
          </Box>
        </a>
        <Typography variant="p">with a little help from my friends</Typography>
        <a href="https://www.linkedin.com/in/davidphilipcollis/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <LinkedInIcon />
            <Typography variant="h2">Dave Collis</Typography>
          </Box>
        </a>
        <Typography variant="p">&</Typography>
        <a href="https://www.linkedin.com/in/timcrisp94/" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <LinkedInIcon />
            <Typography variant="h2">Tim Crisp</Typography>
          </Box>
        </a>
      </Stack>
      <Box sx={{width: '45%', maxWidth: '200px', margin: '45px auto !important'}}>
        <BuyMeACoffeeButton />
      </Box>
      <Divider />
      <ReachOut />
    </Stack>
  );
}
 
export default DonateMobile;