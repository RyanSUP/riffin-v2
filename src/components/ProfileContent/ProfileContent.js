// Services
import * as profileServices from '../../services/profileServices';
import * as userUtils from "../../utils/userUtils";

// Components / hooks
import { useEffect, useState, useContext } from 'react';
import TablatureCard from '../TablatureCard/TablatureCard';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';


const ProfileContent = () => {
    const [tablatures, setTablatures] = useState(null)
    const [preferredUsername, setPreferredUsername] = useState(null)
    const { cognitoUsername } = useParams()
    const { user } = useContext(UserContext)


    // TODO Find out why this always runs twice if the user is viewing their own profile -- first it makes a request to grab the public profile data and then it makes a request to grab all profiledata. My guess is because 'user' isn't loading right away.
    useEffect(() => {
        if(user && user.username === cognitoUsername) {
            // If the current user is viewing their own profile, grab all of their data.
            // Otherwise only grab public data.
            const idToken = userUtils.getIdTokenFromUser(user);
            profileServices.getProfileOfLoggedInUser(user.username, idToken)
            .then ( res => {
                console.log(res.profile.tablature)
                const usersTablature = res.profile.tablature
                const usersFavoriteTablature = res.profile.favoriteTablature
                const combinedTabArrays = [].concat(usersTablature, usersFavoriteTablature)
                setTablatures(combinedTabArrays)
                setPreferredUsername(user.profile.preferredUsername)
            })
        } else {
            profileServices.getUsersPublicInfo(cognitoUsername)
            .then( res => {
                setTablatures(res.usersTablature)
                setPreferredUsername(res.preferredUsername)
            })
        }
    }, [cognitoUsername, user])

    return (
        <>
            {tablatures?.map( (tabData, i) => (
                <TablatureCard 
                    tablature={tabData}
                    nameOfOwner={preferredUsername}
                    key={i} 
                />
            ))}
        </>
    );
}
 
export default ProfileContent;