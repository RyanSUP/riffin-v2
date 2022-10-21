import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";

const Donate = () => {
  return (
    <Box sx={{px: "20px", mb: 15}}>
      <Typography>
        Riffin was created with one goal in mind: 
        <br/>
        <br/>
        Jot down musical ideas without friction from the medium. 
        <br/>
        <br/>
        Part of that commitment is keeping Riffin free.
        <br/>
        <br/>
        $5 is enough to cover the cost of storing and accessing a frequent user's data for one year. If you're enjoying Riffin, please consider "buying me a coffee".
        <br/>
        <br/>
        Be excellent to each other, and party on dudes! 🤘
        <br/>
        <br/>
        Ryan Morici 
        <br/> 
        Creator of Riffin
      </Typography>
      <Stack sx={{mt: 5}} spacing={2}>
        <Button variant="outlined" size="large" sx={{width: '100%'}}>Donate</Button>
        <Button variant="outlined" size="large" sx={{width: '100%'}}>Hide this message</Button>
      </Stack>
    </Box>
  );
}
 
export default Donate;