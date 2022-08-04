import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from '../../App'
import TablatureCard from "../../components/TablatureCard/TablatureCard"
import * as tablatureServices from "../../services/tablatureServices"
import * as userUtils from "../../utils/userUtils"

// TODO ---
// Show loading wheel while user is undefined.
// I need to get all of the users information (profile name, avatar, etc) and public tabs, not just public tabs.
// TODO ---

const Profile = (props) => {
    const [tablature, setTablature] = useState([])
    const [viewingOtherUsersProfile, setViewingOtherUsersProfile] = useState(null)
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
                setViewingOtherUsersProfile(false)
            } else {
                getUsersTablature()
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