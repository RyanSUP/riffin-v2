// Services
import { useState, useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useForm } from "react-hook-form";

// Components
import { Button, TextField, Stack } from "@mui/material";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const { authenticate } = useContext(UserContext);

  /**
   * Handles login form submit.
   * @param {Object} data - the form data
   */
  const onSubmit = (data) => {
    authenticate(data["Email"], data["Password"])
      .then((user) => {
        console.log("Logged in! ", user);
      })
      .catch((error) => {
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
        <Button variant="contained" type="submit">
          <span data-testid="login-button">
            Login
          </span>
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
