// Components / hooks
import Lottie from "lottie-react";
import lottieJam from "./lottieJam.json";
// MUI
import { Box, Typography } from "@mui/material";

/**
 * * MobileEditor is a stubbed up idea to handle smaller screens which shows an animation and message to the user. There currently is no intention to support a mobile editor and UI elements that route to the editor should not be displayed, but if they somehow get routed to it on a mobile device they should see something.
 * 
 * lottie-react documentation:
 * https://lottiereact.com/components/Lottie
 */

// ! This lottie file is always playing, even when hidden. This needs to be addressed to avoid performance issues.

const MobileEditor = () => {
  return (
    <Box sx={{m: 4}}>
      <Typography sx={{textAlign: 'center'}}>Riffin needs a larger screen to access the Editor, dude!</Typography>
      <Lottie animationData={lottieJam} />
    </Box>
  );
};
 
export default MobileEditor;