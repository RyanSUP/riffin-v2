// TODO show different cards dependin on if a user is viewing their own page or someone eleses 

// Services
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from '../../App'
import * as profileServices from "../../services/profileServices"
import * as userUtils from "../../utils/userUtils"

// Components
import { CircularProgress } from '@mui/material';
import TablatureCard from "../../components/TablatureCard/TablatureCard"

const Profile = (props) => {
    // profile state refers to the profile currently being viewed.
    const [profile, setProfile] = useState({
        preferredUsername: "",
        usersTablature: [],
    });
    const { user } = useContext(UserContext);
    const { id } = useParams(); // Parameter from the url (riffin/profile/:id)

    /**
     * If the user is viewing their own profile then the profile state is derived from user state (user.profile), otherwise the profile is fetched from the backend.
     */
    useEffect( () => {
        const getUsersPublicInfo = async () => {
            const idToken = userUtils.getIdTokenFromUser(user);
            return await profileServices.getUsersPublicInfo(id, idToken);
        };

        if(user) {
            if(id === user.username) {
                if(user.profile) {
                    setProfile({
                        preferredUsername: user.profile.preferredUsername,
                        usersTablature: user.profile.tablature,
                    });
                }
            } else {
                getUsersPublicInfo()
                .then( res => {
                    setProfile(res)
                });
            }
        }
    }, [id, user]);
    
    return (
        <>
            {profile.preferredUsername === ""
                ?
                    <CircularProgress />
                :
                <>
                    <p>{profile.preferredUsername}</p>
                    <p>searchbar goes here</p>
                    {profile.usersTablature.map(tablature => <TablatureCard key={tablature._id} tablature={tablature} profile={profile} />)}
                </>
            }
        </>
    );
}
 
export default Profile;