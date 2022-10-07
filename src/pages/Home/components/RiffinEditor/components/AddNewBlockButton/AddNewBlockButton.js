// Components / hooks
import { RiffinEditorDispatch } from '../../RiffinProvider';
import { useContext } from 'react';
// Utilities
import { MAX_BLOCKS } from '../../EditorConfig';
// MUI
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Button } from "@mui/material";

/**
 * * Button to add a new tablature block to the document. If the MAX_BLOCK count is reached, a disabled button will show instead.
 * props: numberOfBlock
 */


const AddNewBlockButton = (props) => {
  const { dispatch, editor } = useContext(RiffinEditorDispatch);

  /**
   * Dispatches an addNewBlock action.
   */
  const handleClick = () => {
    const action = {
      type: 'addNewBlock',
      // * numerOfBlocksBeforeAdding is a workaround to React.StrictMode's behavior of running reducers twice. Without this workaround, 2 blocks would be added.
      numberOfBlocksBeforeAdding: editor.tablature.blocks.length
    }
    dispatch(action);
  };

  return (
    <>
      {(editor.tablature.blocks.length >= MAX_BLOCKS) 
      ?
        <Button variant="outlined" disabled>
          You've reached the limit, dude!
        </Button>
      :
        <Button variant="outlined" onClick={handleClick} endIcon={<PlaylistAddIcon />}>
          add tablature
        </Button>
      }
    </>
  );
};
 
export default AddNewBlockButton;