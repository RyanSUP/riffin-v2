// This component acts as the landing page for users that are not signed in.
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import { useState } from 'react';
import { Container, Link } from '@mui/material';
const Landing = () => {
    const [showLogin, setShowLogin] = useState(true)
    return (
        <>  
            <Container maxWidth="sm">
                {showLogin 
                    ?
                    <>
                        <LoginForm /> 
                        <p>Not a user?</p>
                        <Link href="#" onClick={()=> setShowLogin(!showLogin)}>Sign up!</Link>
                    </>
                    :
                    <>
                        <SignupForm />
                        <p>Already a user?</p>
                        <Link href="#" onClick={()=> setShowLogin(!showLogin)}>Log in!</Link>
                    </>
                }
            </Container>
        </>
    );
}
 
export default Landing;