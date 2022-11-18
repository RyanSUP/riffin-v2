// Services
import { useState, useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useForm } from "react-hook-form";

// Components
import { Button, TextField, Stack } from "@mui/material";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const { authenticate } = useContext(UserContext);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  /**
   * Handles login form submit.
   * @param {{Email, Password}} data - the form data
   */
  const onSubmit = (data) => {
    setErrorMessage(null)
    setWaitingForResponse(true);
    authenticate(data["Email"], data["Password"])
      .then((user) => {
        setWaitingForResponse(false);
      })
      .catch((error) => {
        setWaitingForResponse(false);
        console.error("Failed to login: ", error);
        if(error.code === 'NotAuthorizedException') {
          setErrorMessage("* Incorrect username or password, dude!")
        } else {
          setErrorMessage("* Something went wrong, sorry! Try again, dude!")
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="LoginForm">
      <Stack spacing={2}>
        <TextField required type="email" variant="outlined" placeholder="Email" {...register("Email", {required: true})} />
        <TextField required type="password" variant="outlined" placeholder="Password" {...register("Password", {required: true})} />
        {errorMessage &&
          <p style={{color: "red"}}>{errorMessage}</p>
        } 
        <Button variant="contained" type="submit" disabled={waitingForResponse}>
          <span data-testid="login-button">
            Login
          </span>
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
