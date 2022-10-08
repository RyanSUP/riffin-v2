import { useContext } from "react";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinProvider";
import { Button, Tooltip } from "@mui/material";

const buttonStyle = {
  width: "100%"
}

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
          onClick={handleDelete}
          variant="outlined"
          sx={buttonStyle}
          disabled={props.disabled}
        >
          Delete
        </Button>
      </span>
    </Tooltip>
  );
}
 
export default DeleteBlockButton;