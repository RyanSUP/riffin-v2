import { Box, Typography } from "@mui/material";
import CreateGuitarTabButton from "../../Sidebar/components/CreateGuitarTabButton/CreateGuitarTabButton";
import CreateBassTabButton from "../../Sidebar/components/CreateBassTabButton/CreateBassTabButton";
import { useTheme } from "@mui/material"
import { useMediaQuery } from "@mui/material";
const NoTablatureMessage = () => {
  const theme = useTheme();
  const belowMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{margin: "25px auto", textAlign: "center"}}>
      <Typography variant="h2">Lets rock 🤘</Typography>
      <Box sx={{display: "flex", justifyContent: "space-between", width: "300px", m: 2}}>
        <CreateGuitarTabButton disabled={belowMediumScreen}/>
        <CreateBassTabButton disabled={belowMediumScreen}/>
      </Box>
   </Box>
  );
}
 
export default NoTablatureMessage;