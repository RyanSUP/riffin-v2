// This component acts as the landing page for users that are not signed in.
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';

const Landing = () => {
    return (
        <>  
            <>Nav for non users</>
            <SignupForm />
            <LoginForm />
        </>
    );
}
 
export default Landing;