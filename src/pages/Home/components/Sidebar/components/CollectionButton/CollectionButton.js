// Components / hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TagContext } from "containers/TagProvider/TagProvider";

// MUI
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CollectionButton = () => {
  const [variant, setVariant] = useState("text")
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useContext(UserContext)
  const { clearTags } = useContext(TagContext);

  const handleClick = () => {
    clearTags();
    user ? navigate(`/profile/${user?.username}`) : navigate('/login')
  }

  useEffect(()=> {
    const urlData = location.pathname.split('/')
    const path = urlData[1]
    const username = urlData[2]
    if(path === 'profile' && username === user?.username) {
      setVariant("contained")
    } else {
      setVariant("text")
    }
  }, [location, user])

  return (  
    <Button 
      startIcon={<FavoriteIcon />}
      onClick={handleClick}
      sx={{fontWeight: "bold", justifyContent: 'left', my: 0.5, textTransform: 'none'}}
      disableElevation
      variant={variant}
      size="large"
    >
      Collection
    </Button>  
  );
}
 
export default CollectionButton;