import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SpeedDialTooltipOpen(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSetPublic = () => {
    props.setPublic()
    handleClose()
  }

  const handleSave = () => {
    props.saveTablatureToDatabasae()
    handleClose()
  }

  const handleDelete = () => {
    props.deleteTablatureFromDatabase()
    handleClose()
  }

  const handleAddBar = () => {
    props.addBarToTablature()
    handleClose()
  }

  const actions = [
    { icon: <SaveIcon />, name: 'Save', action: handleSave },
    { icon: <PlaylistAddIcon />, name: 'New bar', action: handleAddBar},
    { 
      icon: props.isPublic ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />, 
      name: props.isPublic ? 'Make private' : 'Make public', 
      action: handleSetPublic 
    },
  ];
  
  if(props.allowDelete) {
    actions.push({ icon: <DeleteIcon />, name: 'Delete', action: handleDelete })
  }
  
  return (

      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={()=> action.action()}
          />
        ))}
      </SpeedDial>
  );
}
