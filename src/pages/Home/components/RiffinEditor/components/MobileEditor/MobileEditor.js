import Lottie from "lottie-react";
import lottieJam from "./lottieJam.json";
import { Box, Typography } from "@mui/material";

const MobileEditor = () => {

  return (
    <Box sx={{m: 4}}>
      <Typography sx={{textAlign: 'center'}}>Riffin needs a larger screen to access the Editor, dude!</Typography>
      <Lottie animationData={lottieJam} />
    </Box>
  );
}
 
export default MobileEditor;