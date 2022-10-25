// Components / hooks
import { useContext } from "react";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinProvider";
// MUI
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Tooltip } from "@mui/material";

const buttonStyle = {
  width: "100%"
}

/**
 * * Handles deleting the selected block. A dispatch is sent out to handle deleting.
 * @param {Object} props - disabled
 * @returns 
 */

const DeleteBlockButton = (props) => {
  const { dispatch } = useContext(RiffinEditorDispatch);
  /**
   * Dispatches a deleteBlock action to remove the block from the tablature.
   */
   const handleDelete = () => {
    const action = {
      type: 'deleteBlock',
      block: props.block
    };
    dispatch(action);
  };

  return (
    <Tooltip title={props.disabled ? "You cannot delete the only block" : "" }>
      <span>
        <Button 
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          variant="outlined"
          sx={buttonStyle}
          color="error"
          disabled={props.disabled}
        >
          Delete
        </Button>
      </span>
    </Tooltip>
  );
}
 
export default DeleteBlockButton;