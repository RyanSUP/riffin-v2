// Components / hooks
import Lottie from "lottie-react";
// Images
import guitarLoading from "./guitar-loading.json";
// MUI
import { Container, Typography } from "@mui/material";

const lottieStyle = {
  height: 300,
};

const LoadingPlaceholder = (props) => {
  return (
    <>
      {props.isLoading
        ?
          <Container>
            <Lottie style={lottieStyle} animationData={guitarLoading} />;
            <Typography sx={{textAlign: 'center'}}>Loading...</Typography>
          </Container>
        :
          <>{props.children}</>
      }
    </>
  );
}
 
export default LoadingPlaceholder;