// Components / hooks
import { useContext, useEffect, useState } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/UserTablatureProvider/UserTablatureProvider";
import { useNavigate } from "react-router-dom";

// Services / Utils
import { getIdTokenFromUser } from "utils/userUtils";
import { handleLikingTablature } from 'services/profileServices'

// MUI
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggledIconButton from "components/ToggledIconButton/ToggledIconButton";

const FavoriteIconButton = (props) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { addToUsersLikedTablature, removeFromUsersLikedTablature } = useContext(TablatureContext)
  const [likedByCurrentUser, setLikedByCurrentUser] = useState()
  const [ownedByUser, setOwnedByUser] = useState()

  const handleClick = (action) => {
    if(user) {
      if(action === 'like') {
        addToUsersLikedTablature(props.tab_id)  
      } else {
        removeFromUsersLikedTablature(props.tab_id)
      }
      const idToken = getIdTokenFromUser(user);
      handleLikingTablature(action, user.profile._id, props.tab_id, idToken)
      setLikedByCurrentUser(!likedByCurrentUser)
    } else {
      navigate("/login")
    }
  }

  useEffect(() => {
    if(user) {
      const likeStatus = user.profile?.favoriteTabHash[props.tab_id] ? true : false
      setLikedByCurrentUser(likeStatus)
      setOwnedByUser(user.username === props.tabOwner)
    }
  }, [user, props])

  return (
    <>
      <ToggledIconButton
        isDisabled={ownedByUser}
        startOnA={likedByCurrentUser}
        iconA={<FavoriteIcon />}
        titleA={""}
        handleClickA={() => handleClick('unlike')}
        iconB={<FavoriteBorderIcon />}
        titleB={""}
        handleClickB={() => handleClick('like')}
      />
    </>
  );
}
 
export default FavoriteIconButton;