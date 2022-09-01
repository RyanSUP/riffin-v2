// MUI
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavoriteIconButton = (props) => {
  return (
    <IconButton disabled={props.isDisabled}>
      <FavoriteBorderIcon />
    </IconButton>
  );
}
 
export default FavoriteIconButton;