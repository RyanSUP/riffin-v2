// Components / hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// MUI
import Button from '@mui/material/Button';
import StarsIcon from '@mui/icons-material/Stars';

const LatestButton = () => {
  const [variant, setVariant] = useState("text")
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => navigate('/latest')

  useEffect(()=> {
    if(location.pathname.startsWith("/latest")) {
      setVariant("contained")
    } else {
      setVariant("text")
    }
  }, [location])

  return (  
    <Button 
      startIcon={<StarsIcon />}
      onClick={handleClick}
      sx={{justifyContent: 'left', pl: '16px', my: 1}}
      disableElevation
      variant={variant}
    >
      Latest
    </Button>  
  );
}
 
export default LatestButton;