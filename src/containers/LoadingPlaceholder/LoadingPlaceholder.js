import { LinearProgress } from "@mui/material";

const LoadingPlaceholder = (props) => {
  return (
    <>
      {props.isLoading 
        ?
          <LinearProgress />
        :
          <>{props.children}</>
      }
    </>
  );
}
 
export default LoadingPlaceholder;