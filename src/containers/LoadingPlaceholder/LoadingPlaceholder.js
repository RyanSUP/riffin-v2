// Components / hooks
import { useLottie } from "lottie-react";
import guitarLoading from "./guitar-loading.json";
import { Container, Typography } from "@mui/material";
const lottieStyle = {
  height: 300,
};

const LoadingPlaceholder = (props) => {
  
  const options = {
    animationData: guitarLoading,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, lottieStyle);


  return (
    <>
      {props.isLoading
        ?
          <Container >
            {View}
            <Typography sx={{textAlign: 'center'}}>Loading...</Typography>
          </Container>
        :
          <>{props.children}</>
      }
    </>
  );
}
 
export default LoadingPlaceholder;