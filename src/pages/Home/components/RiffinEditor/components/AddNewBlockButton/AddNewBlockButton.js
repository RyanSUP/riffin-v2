// Components / hooks
import { RiffinEditorDispatch } from '../../RiffinEditor';
import { useContext } from 'react';
// MUI
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Button } from "@mui/material";

const AddNewBlockButton = (props) => {
  const dispatcher = useContext(RiffinEditorDispatch);

  /**
   * Dispatches an addNewBlock action.
   */
  const handleClick = () => {
    const action = {
      type: 'addNewBlock',
      // * numerOfBlocksBedoreAdding is a workaround to React.StrictMode's behavior of running reducers twice. Without this workaround, 2 blocks would be added.
      numberOfBlocksBeforeAdding: props.numberOfBlocks
    }
    dispatcher(action);
  };

  return (
    <Button variant="outlined" onClick={handleClick} endIcon={<PlaylistAddIcon />}>
      add tablature
    </Button>
  );
};
 
export default AddNewBlockButton;