// MUI
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Tooltip , IconButton} from '@mui/material';

export default function SpeedDialTooltipOpen(props) {
  
  const handleSetPublic = () => {
    props.setPublic()
  }

  const handleSave = () => {
    props.saveTablatureToDatabase()
  }

  const handleDelete = () => {
    props.deleteTablatureFromDatabase()
  }

  const handleAddBar = () => {
    props.addBarToTablature()
  }

  const actions = [
    { icon: <PlaylistAddIcon />, title: 'New bar', action: handleAddBar},
    { 
      icon: props.isPublic ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />, 
      title: props.isPublic ? 'Make public' : 'Make private', 
      action: handleSetPublic 
    },
    { icon: <SaveIcon />, title: 'Save', action: handleSave },
  ];
  
  if(props.allowDelete) {
    actions.push({ icon: <DeleteIcon />, title: 'Delete', action: handleDelete })
  }
  
  return (
    <Box>
      {actions.map((action) => (
        <Tooltip title={action.title} key={action.title}>
          <IconButton onClick={action.action} size="large">
            {action.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
