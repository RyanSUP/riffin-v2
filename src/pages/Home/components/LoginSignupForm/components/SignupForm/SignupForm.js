// Services / utils
import UserPool from "utils/UserPool";

// Components / hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useState, useContext } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const { authenticate } = useContext(UserContext);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  /**
   * handles the sign up form submit
   * @param {Object} event
   */
  const onSubmit = (formData) => {
    setErrorMessage(null)
    if(formData['Password'] !== formData['Confirm Password']) {
      setErrorMessage("* Password and Confirm Password must match, dude!")
    } else {
      setWaitingForResponse(true);
      UserPool.signUp(formData["Email"], formData["Password"], [], null, (error, data) => {
        if (error) {
          if(error.code === 'UsernameExistsException') {
            setErrorMessage('* an account with that email already exists, dude!')
          } else if(error.code === "InvalidPasswordException") {
            setErrorMessage('* Password must be 8+ characters with at least 1 special character, uppercase character, and number.')
          } else {
            setErrorMessage("* Something went wrong, sorry! Try again, dude!")
          }
          setWaitingForResponse(false);
        } else {
          authenticate(formData["Email"], formData["Password"], "new user")
          .then((user) => {
            setWaitingForResponse(false);
          })
          .catch((error) => {
            console.error("Failed to sign up: ", error);
            setErrorMessage('* failed to sign up. Sorry dude!')
            setWaitingForResponse(false);
          });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField required type="email" variant="outlined" placeholder="Email" {...register("Email", {required: true})} />
        <TextField required type="password" variant="outlined" placeholder="Password" {...register("Password", {required: true})} />
        <TextField required type="password" variant="outlined" placeholder="Confirm Password" {...register("Confirm Password", {required: true})} />
        {errorMessage &&
          <p style={{color: "red"}}>{errorMessage}</p>
        }
        <Button variant="contained" type="submit" disabled={waitingForResponse}>
          <span data-testid="signup-button">Signup</span>
        </Button>
      </Stack>
    </form>
  );
};

export default SignupForm;
