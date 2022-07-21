import { useEffect, useContext } from "react";
import { CircularProgress } from '@mui/material';
import { create } from "../../services/tablatureServices";
import { UserContext } from '../../App';
import { useNavigate } from "react-router-dom";
import { getIdTokenFromUser } from "../../utils/userUtils";


const NewTablature = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(()=> {

        if(user) {
            const username = user.username;
            const idToken = getIdTokenFromUser(user);
            create(username, idToken)
            .then( res => {
                navigate(`/tablature/${res._id}`)
            })
        }
    }, [user]);

    return ( <CircularProgress /> );
}
 
export default NewTablature;