import { useContext } from "react";
import { UserContext } from "../../App";
const Trending = () => {
    const { logout } = useContext(UserContext)
    return (
        <>
            <button onClick={logout}>Logout</button>
            <>I'm trending!</>
        </>
    );
}
 
export default Trending;