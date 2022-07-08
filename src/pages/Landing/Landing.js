// This component acts as the landing page for users that are not signed in.
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import { useState } from 'react';
import { Container } from '@mui/material';
const Landing = () => {
    const [showLogin, setShowLogin] = useState(true)
    return (
        <>  
            <>Nav for non users</>
            <Container maxWidth="sm">
                {showLogin 
                    ?
                    <>
                        <LoginForm /> 
                        <p>Not a user?</p>
                        <button onClick={()=> setShowLogin(!showLogin)}>Sign up!</button>
                    </>
                    :
                    <>
                        <SignupForm />
                        <p>Already a user?</p>
                        <button onClick={()=> setShowLogin(!showLogin)}>Log in!</button>
                    </>
                }
            </Container>
        </>
    );
}
 
export default Landing;