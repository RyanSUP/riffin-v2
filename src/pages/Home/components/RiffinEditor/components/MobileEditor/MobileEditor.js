import { useLottie } from "lottie-react";
import lottieJam from "./lottieJam.json";
import { Box, Typography } from "@mui/material";

const MobileEditor = () => {
  const options = {
    animationData: lottieJam,
    loop: true
  };

  const { View } = useLottie(options);
  return (
    <Box sx={{m: 4}}>
      <Typography sx={{textAlign: 'center'}}>Riffin needs a larger screen to access the Editor, dude!</Typography>
      {View}
    </Box>
  );
}
 
export default MobileEditor;