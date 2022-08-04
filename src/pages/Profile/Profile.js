import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from '../../App'
import * as tablatureServices from "../../services/tablatureServices"
import * as userUtils from "../../utils/userUtils"

// TODO ---
// If user is the same as :id, then show tablature from state (usersTablature and usersFavoriteTablature). Otherwise make a request to get all of the users public tablature.
// Show loading wheel while user is undefined.
// TODO ---

const Profile = (props) => {
    const [tablature, setTablature] = useState([])
    const { user } = useContext(UserContext)
    const { id } = useParams()



    useEffect( () => {
        const getUsersTablature = async () => {
            const idToken = userUtils.getIdTokenFromUser(user);
            return await tablatureServices.getUsersPublicTablature(id, idToken)
        }

        if(user) {
            if(id === user.username) {
                setTablature(props.usersTablature)
            } else {
                getUsersTablature()
                .then( res => {
                    setTablature(res.usersTablature)
                })
            }
        }
    }, [id, user, props.usersTablature])
    
    return (
        <>
            {tablature?.map(tablature => <p key={tablature._id}>{tablature._id}</p>)}
        </>
    );
}
 
export default Profile;