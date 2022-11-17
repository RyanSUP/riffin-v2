import { Button, Typography } from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback';
const ReachOut = () => {
  return (
    <>
      <Typography variant="h2">Reach out! <FeedbackIcon /></Typography>
      <Typography variant="p">Submit feedback through our contact form</Typography>
      <a href="https://airtable.com/shreuEqEiILbGu7NN" target="_blank" rel="noreferrer" style={{textDecoration: 'none', width: '100%'}}>
        <Button variant="outlined" style={{width: '100%'}}>Contact</Button>
      </a>
    </>
  );
}
 
export default ReachOut;