// Services
import { useNavigate } from "react-router-dom";

// Components
import Button from "@mui/material/Button";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="contained" onClick={() => navigate("/login")}>
      Login
    </Button>
  );
};

export default LoginButton;
