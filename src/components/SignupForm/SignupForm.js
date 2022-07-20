import { UserContext } from '../../App';
import { useState, useContext } from "react";
import UserPool from "../../utils/UserPool";
import { Button, TextField, Stack } from "@mui/material"
import * as profileServices from '../../services/profileServices';
import { getIdTokenFromUser } from '../../utils/userUtils';
const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [preferredUsername, setPreferredUsername] = useState("");
    const { authenticate } = useContext(UserContext);

    const onSubmit = (event) => {
        event.preventDefault();
        let attributes = [
            {
                Name: "preferred_username",
                Value: preferredUsername,
            }
        ];
        UserPool.signUp(email, password, attributes, null, (error, data) => {
            if (error) {
                console.error(error);
            } else {
                console.log(data)
                authenticate(email, password)
                .then(user => {
                    let idToken = getIdTokenFromUser(user);
                    let username = user.username;
                    profileServices.create(username, idToken)
                    .then( res => {
                        console.log("🚀 ~ file: SignupForm.js ~ line 32 ~ UserPool.signUp ~ res", res)
                    })
                    .catch( error => {
                        console.log("🚀 ~ file: SignupForm.js ~ line 36 ~ UserPool.signUp ~ error", error)
                    })
                })
                .catch(error => {
                    console.error("Failed to sign up: ", error)
                });
            }
        });
    }

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
                <Button variant="contained" type="submit">Signup</Button>
            </Stack>
        </form>
    );
}
 
export default SignupForm;