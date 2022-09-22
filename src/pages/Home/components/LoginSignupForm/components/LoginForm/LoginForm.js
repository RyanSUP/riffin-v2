// Services
import { useState, useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// Components
import { Button, TextField, Stack } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(UserContext);

  /**
   * Handles login form submit.
   * @param {Object} event
   */
  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((user) => {
        console.log("Logged in! ", user);
      })
      .catch((error) => {
        console.error("Failed to login: ", error);
      });
  };

  return (
    <form onSubmit={onSubmit} data-testid="LoginForm">
      <Stack spacing={2}>
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
          <span data-testid="login-button">Login</span>
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
