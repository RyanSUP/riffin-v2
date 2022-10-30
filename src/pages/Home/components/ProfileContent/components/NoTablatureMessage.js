import { Box, Typography } from "@mui/material";
import CreateGuitarTabButton from "../../Sidebar/components/CreateGuitarTabButton/CreateGuitarTabButton";
import CreateBassTabButton from "../../Sidebar/components/CreateBassTabButton/CreateBassTabButton";

const NoTablatureMessage = () => {
  return (
    <Box sx={{margin: "25px auto"}}>
      <Typography >You don't have any tabs yet, dude!</Typography>
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <CreateGuitarTabButton />
        <CreateBassTabButton />
      </Box>
   </Box>
  );
}
 
export default NoTablatureMessage;