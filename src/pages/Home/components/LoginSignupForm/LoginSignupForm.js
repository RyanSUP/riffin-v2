// Components / hooks
import { useState, useEffect, useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";

// MUI
import { Container, Link } from "@mui/material";

const LoginSingupForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Prevent user from navigating to the login page.
   */
  useEffect(() => {
    if (user) {
      navigate("/trending");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      {showLogin ? (
        <>
          <LoginForm />
          <p>Not a user?</p>
          <Link href="#" onClick={() => setShowLogin(!showLogin)}>
            Sign up!
          </Link>
        </>
      ) : (
        <>
          <SignupForm />
          <p>Already a user?</p>
          <Link href="#" onClick={() => setShowLogin(!showLogin)}>
            Log in!
          </Link>
        </>
      )}
    </Container>
  );
};

export default LoginSingupForm;
