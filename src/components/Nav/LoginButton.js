import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// On click, show me landing page
const LoginButton = () => {
    const navigate = useNavigate()
    return (
        <Button
            variant="contained"
            onClick={()=> navigate('/login')}
        >   
          Login
      </Button>
    );
}
 
export default LoginButton;