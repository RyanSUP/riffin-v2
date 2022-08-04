import { useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from '../../App'

// TODO ---
// If user is the same as :id, then show tablature from state (usersTablature and usersFavoriteTablature). Otherwise make a request to get all of the users public tablature.
// Show loading wheel while user is undefined.
// TODO ---

const Profile = () => {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    
    return (
        <>
            {(user?.username === id)
                ?
                    <p>This is the current user's page!</p>
                :
                    <p>This is someone elses page!</p>
            }
        </>
    );
}
 
export default Profile;