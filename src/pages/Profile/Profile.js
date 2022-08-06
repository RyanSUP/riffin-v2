import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from '../../App'
import TablatureCard from "../../components/TablatureCard/TablatureCard"
import * as profileServices from "../../services/profileServices"
import * as userUtils from "../../utils/userUtils"
import { CircularProgress } from '@mui/material';

const Profile = (props) => {
    const [profile, setProfile] = useState({
        preferredUsername: "",
        usersTablature: [],
    })
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
                if(user.profile) {
                    setProfile({
                        preferredUsername: user.profile.preferredUsername,
                        usersTablature: user.profile.tablature,
                    })
                    setViewingOtherUsersProfile(false)
                }
            } else {
                getUsersPublicInfo()
                .then( res => {
                    setProfile(res)
                })
                setViewingOtherUsersProfile(true)
            }
        }
    }, [id, user])
    
    return (
        <>
            {profile.preferredUsername === ""
                ?
                    <CircularProgress />
                :
                <>
                    <p>{profile.preferredUsername}</p>
                    {/* TODO show different cards dependin on if a user is viewing their own page or someone eleses */}
                    {viewingOtherUsersProfile &&
                        <button>Follow</button>
                    }
                    <p>searchbar goes here</p>
                    {profile.usersTablature.map(tablature => <TablatureCard key={tablature._id} tablature={tablature} />)}
                </>
            }
        </>
    );
}
 
export default Profile;