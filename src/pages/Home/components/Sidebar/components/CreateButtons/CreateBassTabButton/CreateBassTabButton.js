// Components / hooks
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// MUI
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';

const CreateBassTabButton = () => {  
  const navigate = useNavigate()  
  const { user } = useContext(UserContext)
  const handleClick = () => {
    user ? navigate(`/new/bass`) : navigate('/login')
  }

  return (
    <Button
      startIcon={<AddCircleIcon />}
      onClick={handleClick}
      sx={{justifyContent: 'left', pl: '16px', my: 1}}
      disableElevation
    >
      Add Bass Tab
    </Button>
  )

}

export default CreateBassTabButton