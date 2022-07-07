import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { Account } from './components/Account';
import Status from './components/Status';

function App() {
  return (
    <Account>
      <Status />
      <SignupForm />
      <LoginForm />
    </Account>
  );
}

export default App;
