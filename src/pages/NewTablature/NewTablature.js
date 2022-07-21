import { useEffect, useState, useContext } from "react";
import { CircularProgress } from '@mui/material';
import { create } from "../../services/tablatureServices";
import { UserContext } from '../../App';
import { Navigate, useNavigate } from "react-router-dom";
import { getIdTokenFromUser } from "../../utils/userUtils";


const NewTablature = () => {
    const [tablatureId, setTablatureId] = useState(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(()=> {
        // TODO Send a fetch request to the server
        // // TODO SHow spinny while waiting for response
        // TODO When successsful response is received, reroute to /tablature/:id
        if(user) {
            const username = user.username;
            const idToken = getIdTokenFromUser(user);
            create(username, idToken)
            .then( res => {
                navigate(`/tablature/${res._id._id}`)
            })
        }
    }, [user]);

    return (
        <CircularProgress />
    );
}
 
export default NewTablature;