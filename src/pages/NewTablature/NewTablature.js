import { useEffect, useContext } from "react";
import { CircularProgress } from '@mui/material';
import { create, createBar } from "../../services/tablatureServices";
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
                let tablature_id = res.tab._id
                navigate(`/tablature/${tablature_id}`)
            })
        }
    }, [user]);

    return ( <CircularProgress /> );
}
 
export default NewTablature;