import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Donate = () => {
  return (
    <Box sx={{px: "20px"}}>
      <Typography>
        Some words about riffin from the creator. Some words about riffin from the creator. Some words about riffin from the creator . Some words about riffin from the creator. Some words about riffin from the creator
      </Typography>
      <Button variant="outlined" size="large" sx={{width: '100%'}}>Donate</Button>
    </Box>
  );
}
 
export default Donate;