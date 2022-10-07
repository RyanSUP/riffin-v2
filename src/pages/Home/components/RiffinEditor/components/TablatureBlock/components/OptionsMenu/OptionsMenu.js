// Components / hooks
import { useState, useContext } from 'react';
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinProvider";
import SizeSlider from './components/SizeSlider/SizeSlider';
// MUI
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * * Most of the this is adapted straight from the MUI documentation 
 * https://mui.com/material-ui/react-menu/#customization
 * props: block, index
 */

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


export default function OptionsMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useContext(RiffinEditorDispatch);
  const open = Boolean(anchorEl);
  
  /**
   * Opens the menu
   * @param {Object} event 
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  /**
   * Closes the menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Dispatches a deleteBlock action to remove the block from the tablature.
   */
  const handleDelete = () => {
    const action = {
      type: 'deleteBlock',
      block: props.block
    };
    dispatch(action);
    handleClose();
  };

  /**
   * Dispatches a duplicateBlock action to add a copy of the current block to the tablature.
   */
  const handleDuplicate = () => {
    const action = {
      type: 'duplicateBlock',
      blockToDuplicate: props.block
    };
    console.log('dispatching', action);
    dispatch(action);
    handleClose();
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disabled disableRipple>
          Size
        </MenuItem>
        <MenuItem disableRipple>
          <SizeSlider block={props.block} />
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDuplicate} disableRipple>
          <ArchiveIcon />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
