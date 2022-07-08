import { useState } from "react";
import UserPool from "../utils/UserPool";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [preferredUsername, setPreferredUsername] = useState("");

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
                console.error(error)
            } else {
                console.log(data)
            }
        });
    }

    return (  
        <form onSubmit={onSubmit}>
            <label htmlFor="preferred_username">Username</label>
            <input
                value={preferredUsername}
                onChange={(event) => setPreferredUsername(event.target.value)}
            ></input>
            <label htmlFor="email">Email</label>
            <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            ></input>
            <label htmlFor="password">Password</label>
            <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button type="submit">Signup</button>
        </form>
    );
}
 
export default SignupForm;