// Components / hooks
import { useContext } from "react";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinProvider";
// MUI
import { Button } from "@mui/material";

const buttonStyle = {
  width: "100%",
};

const DuplicateBlockButton = () => {
  const { dispatch } = useContext(RiffinEditorDispatch);
  /**
   * Dispatches a duplicateBlock action to add a copy of the current block to the tablature.
   */
   const handleDuplicate = () => {
    const action = {
      type: 'duplicateBlock',
    };
    dispatch(action);
  };

  return (
    <Button 
      onClick={handleDuplicate}
      variant="outlined"
      color="tabInput"
      sx={buttonStyle}
    >
      Duplicate
    </Button>);
}
 
export default DuplicateBlockButton;