// Components / hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useState, useContext } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { Container } from "@mui/system";
import { useSnackbar } from "notistack";

const ChangePasswordForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const { changePassword, navToProfile } = useContext(UserContext);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  /**
   * handles the sign up form submit
   * @param {Object} event
   */
  const onSubmit = (formData) => {
    setErrorMessage(null);
    setWaitingForResponse(true);
    if(formData['New password'] !== formData['Confirm new password']) {
      console.log('Error!');
      setWaitingForResponse(false);
      setErrorMessage("* New password and Confirm new password must match, dude!");
    } else {
      console.log('formData', formData);
      changePassword(formData['Old password'], formData['New password'])
      .then(() => {
        console.log('resolved to true')
        enqueueSnackbar(`Password changed!}!`, { variant: "success" });
        setWaitingForResponse(false);
        navToProfile();
      }) 
      .catch((error) => {
        setWaitingForResponse(false);
        console.error("Failed to login: ", error);
        if(error.code === 'NotAuthorizedException') {
          setErrorMessage("* Incorrect username or password, dude!")
        } else {
          setErrorMessage(error || "* Something went wrong, sorry! Try again, dude!")
        }
      })
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField required type="password" variant="outlined" placeholder="Old password" {...register("Old password", {required: true})} />
          <TextField required type="password" variant="outlined" placeholder="New password" {...register("New password", {required: true})} />
          <TextField required type="password" variant="outlined" placeholder="Confirm new password" {...register("Confirm new password", {required: true})} />
          {errorMessage &&
            <p style={{color: "red"}}>{errorMessage}</p>
          }
          <Button variant="contained" type="submit" disabled={waitingForResponse}>
            <span data-testid="signup-button">Change password</span>
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ChangePasswordForm;
