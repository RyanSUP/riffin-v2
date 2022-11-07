// Services / utils
import UserPool from "utils/UserPool";

// Components / hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useState, useContext } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

const ChangePasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const { changePassword } = useContext(UserContext);

  /**
   * handles the sign up form submit
   * @param {Object} event
   */
  const onSubmit = (formData) => {
    if(formData['New password'] !== formData['Confirm new password']) {
      console.log('Error!');
      setErrorMessage("* New password and Confirm new password must match, dude!");
    } else {
      console.log('formData', formData);
      changePassword(formData['Old password'], formData['New password']); 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField required type="password" variant="outlined" placeholder="Old password" {...register("Old password", {required: true})} />
        <TextField required type="password" variant="outlined" placeholder="New password" {...register("New password", {required: true})} />
        <TextField required type="password" variant="outlined" placeholder="Confirm new password" {...register("Confirm new password", {required: true})} />
        {errorMessage &&
          <p style={{color: "red"}}>{errorMessage}</p>
        }
        <Button variant="contained" type="submit">
          <span data-testid="signup-button">testAuth</span>
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
