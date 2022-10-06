// MUI
import { Container, Typography, LinearProgress } from "@mui/material";

const LoadingPlaceholder = (props) => {
  return (
    <>
      {props.isLoading
        ?
          <Container>
            <LinearProgress />
            <Typography sx={{textAlign: 'center'}}>Loading...</Typography>
          </Container>
        :
          <>{props.children}</>
      }
    </>
  );
}
 
export default LoadingPlaceholder;