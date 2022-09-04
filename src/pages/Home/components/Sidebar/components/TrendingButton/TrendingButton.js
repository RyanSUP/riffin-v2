// Components / hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// MUI
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const TrendingButton = () => {
  const [variant, setVariant] = useState("text")
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => navigate('/trending')

  useEffect(()=> {
    if(location.pathname.startsWith("/trending")) {
      setVariant("contained")
    } else {
      setVariant("text")
    }
  }, [location])

  return (  
    <Button 
      startIcon={<TrendingUpIcon />}
      onClick={handleClick}
      sx={{justifyContent: 'left'}}
      disableElevation
      variant={variant}
    >
      Trending
    </Button>  
  );
}
 
export default TrendingButton;