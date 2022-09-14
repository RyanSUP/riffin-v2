// Components / hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// MUI
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from "@mui/material";

const CreateBassTabButton = () => {
  const [variant, setVariant] = useState("text")
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useContext(UserContext)
  const handleClick = () => {
    user ? navigate(`/new`) : navigate('/login')
  }

  return (
    <Button
      startIcon={<AddCircleIcon />}
      onClick={handleClick}
      sx={{justifyContent: 'left', pl: '16px', my: 1}}
      disableElevation
      variant={variant}
    >
      Add Bass Tab
    </Button>
  )

}

export default CreateBassTabButton