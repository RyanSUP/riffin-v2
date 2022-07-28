import { useEffect, useContext } from "react";
import { CircularProgress } from '@mui/material';
import { create } from "../../services/tablatureServices";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
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
                navigate(`/tablature/${tablature_id}`, { state: { tablature: res.tab } })
            })
        }
    }, [user]);

    return ( <CircularProgress /> );
}
 
export default NewTablature;