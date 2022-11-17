// Services
import { useNavigate } from "react-router-dom";

// Components
import Button from "@mui/material/Button";

const LoginButton = (props) => {
  const navigate = useNavigate();
  return (
    <Button variant="contained" onClick={() => navigate("/login")}>
      {props.altLabel || "Login"}
    </Button>
  );
};

export default LoginButton;
