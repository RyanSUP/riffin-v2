// Services / utils
import UserPool from "utils/UserPool";

// Components / hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useState, useContext } from "react";
import { Button, TextField, Stack } from "@mui/material";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredUsername, setPreferredUsername] = useState("");
  const { authenticate } = useContext(UserContext);

  /**
   * handles the sign up form submit
   * @param {Object} event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    UserPool.signUp(email, password, [], null, (error, data) => {
      if (error) {
        console.error(error);
      } else {
        authenticate(email, password, "new user")
        .then((user) => {
          console.log("Successfully authenticated ", user)
        })
        .catch((error) => {
          console.error("Failed to sign up: ", error);
        });
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Username"
          variant="outlined"
          onChange={(event) => setPreferredUsername(event.target.value)}
          value={preferredUsername}
        />
        <TextField
          label="Email"
          variant="outlined"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <TextField
          label="Password"
          variant="outlined"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Button variant="contained" type="submit">
          <span data-testid="signup-button">Signup</span>
        </Button>
      </Stack>
    </form>
  );
};

export default SignupForm;
