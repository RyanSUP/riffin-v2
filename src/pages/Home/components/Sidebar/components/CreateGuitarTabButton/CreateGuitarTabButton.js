// Components / hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// MUI
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';

const CreateGuitarTabButton = () => {  
  const [variant, setVariant] = useState("text")
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useContext(UserContext)
  const handleClick = () => {
    user ? navigate(`/new/guitar`) : navigate('/login')
  }

  useEffect(()=> {
    const urlData = location.pathname.split('/')
    console.log(urlData)
    const path = urlData[2]
    if(path === 'guitar') {
      setVariant("contained")
    } else {
      setVariant("text")
    }
  }, [location, user])
  
  return (
    <Button
      startIcon={<AddCircleIcon />}
      onClick={handleClick}
      sx={{justifyContent: 'left', my: 0.5}}
      disableElevation
      variant={variant}
      size="large"
    >
      Guitar Tab
    </Button>
  )

}

export default CreateGuitarTabButton
