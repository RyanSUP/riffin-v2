import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from '../../App'
import TablatureCard from "../../components/TablatureCard/TablatureCard"
import * as profileServices from "../../services/profileServices"
import * as userUtils from "../../utils/userUtils"

// TODO ---
// Show loading wheel while user is undefined.
// Set tablature state depending on if viewing own profile or another users
// TODO ---

// GET PROFILE INTO STATE
const Profile = (props) => {
    const [tablature, setTablature] = useState([])
    const [viewingOtherUsersProfile, setViewingOtherUsersProfile] = useState(null)
    const { user } = useContext(UserContext)
    const { id } = useParams()



    useEffect( () => {
        const getUsersPublicInfo = async () => {
            const idToken = userUtils.getIdTokenFromUser(user);
            return await profileServices.getUsersPublicInfo(id, idToken)
        }

        if(user) {
            if(id === user.username) {
                setTablature(props.usersTablature)
                setViewingOtherUsersProfile(false)
            } else {
                getUsersPublicInfo()
                .then( res => {
                    setTablature(res.usersTablature)
                })
                setViewingOtherUsersProfile(true)
            }
        }
    }, [id, user, props.usersTablature])
    
    return (
        <>
            {/* TODO show different cards dependin on if a user is viewing their own page or someone eleses */}
            {viewingOtherUsersProfile &&
                <p>{}</p>
            }
            <p>searchbar goes here</p>
            {tablature?.map(tablature => <TablatureCard key={tablature._id} tablature={tablature} />)}
        </>
    );
}
 
export default Profile;