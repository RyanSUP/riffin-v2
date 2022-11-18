import { Button, Typography, Stack } from "@mui/material";
const ReachOut = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="p">Feature ideas? Questions? Found a bug?</Typography>
      <a href="https://airtable.com/shreuEqEiILbGu7NN" target="_blank" rel="noreferrer" style={{textDecoration: 'none', width: '100%', maxWidth: '250px',margin: '25px auto'}}>
        <Button variant="outlined" style={{width: '100%'}}>Contact</Button>
      </a>
    </Stack>
  );
}
 
export default ReachOut;