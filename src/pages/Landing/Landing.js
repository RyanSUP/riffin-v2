// This component acts as the landing page for users that are not signed in.
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import { useState, useEffect, useContext } from 'react';
import { Container, Link } from '@mui/material';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';


const Landing = () => {
    const [showLogin, setShowLogin] = useState(true);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // Prevent use from 
    useEffect(()=>{
        if(user) {
            navigate('/trending')
        }
    },[user, navigate])

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